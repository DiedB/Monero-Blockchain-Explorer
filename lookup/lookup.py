import json
import grequests
import time
import pymysql
import logging
from cysystemd import journal
import os

API_HOST = os.environ['REACT_APP_ONION_EXPLORER_HOST']
LIMIT = 10
START_BLOCK = 0

log = logging.getLogger('lookup')
log.addHandler(journal.JournaldLogHandler())
log.setLevel(logging.INFO)

db_connection = pymysql.connect(
    host = os.environ['MYSQL_HOST'],
    port = 3306,
    user = os.environ['MYSQL_USER'],
    passwd = os.environ['MYSQL_PASSWORD'],
    db = os.environ['MYSQL_DATABASE']
)

def insert(db_conn, ins):
    cursor = db_conn.cursor()

    sql = "INSERT INTO lookup (pk, tx_hash) VALUES (UNHEX(%s), UNHEX(%s))"
    cursor.executemany(sql, ins)
    db_conn.commit()

def write_height(height):
    # Open the file in write mode ('w')
    with open('lookup_next_block_height.txt', 'w') as file:
        file.write(str(height))

def get_next_height():
    try:
        # Open the file in read mode ('r')
        with open('lookup_next_block_height.txt', 'r') as file:
            return int(file.read())
    except FileNotFoundError:
        return 0

def percentage(part, whole):
    percentage_number = 100 * float(part)/float(whole)
    return "{:.2f}".format(percentage_number) + "%"

def get_concurrency(height):
    if height < 1371520: # block per tx is low before 2017. 08.
        return 30
    if height < 3089848: # less than current height
        return 10
    else:
        return 1

def get_blocks(block_height, number_of_blocks):
    log.info('Downloading %s blocks from %s', number_of_blocks, block_height)

    urls = []
    for i in range(number_of_blocks):
        urls.append(f"{API_HOST}/block/{block_height + i}")
    
    responses = grequests.map(grequests.get(u) for u in urls)
    block_json = []
    for block_raw in responses:
        try:
            block_json.append(block_raw.json())
        except Exception as e:
            print('url:', url)
            print(e)
            time.sleep(9999999)
    return block_json


block_height = get_next_height()
print(f"Starting lookup from block height {block_height}")
while True:
    concurrency = get_concurrency(block_height)
    blocks = get_blocks(block_height, concurrency)
    urls = []
    for block in blocks:
        if block['status'] == 'fail':
            time.sleep(10)
            break
        else:
            for tx in block['data']['txs']:
                urls.append(f"{API_HOST}/transaction/{tx['tx_hash']}")
            
    log.info(f"Downloading {len(urls)} transactions for {concurrency} blocks from height {block_height} ({percentage(block_height, block['data']['current_height'])})")
    print(f"Downloading {len(urls)} transactions for {concurrency} blocks from height {block_height} ({percentage(block_height, block['data']['current_height'])})")
    responses = grequests.map(grequests.get(u) for u in urls)

    in_results = set()
    for api_result_tx in responses:
        result_tx = api_result_tx.json()
        tx_hash = result_tx['data']['tx_hash']
        if result_tx['data']['inputs'] is not None:
            for ins in result_tx['data']['inputs']:
                for mixin in ins['mixins']:
                    in_results.add((mixin['public_key'], tx_hash))

    insert(db_connection, in_results)
    block_height += concurrency
    write_height(block_height)
