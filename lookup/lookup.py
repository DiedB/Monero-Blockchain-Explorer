import json
import grequests
import datetime
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
    Percentage = 100 * float(part)/float(whole)
    return str(Percentage) + “%”

block_height = get_next_height()
print(f"Starting lookup from block height {block_height}")
while True:
    log.info('Downloading block %s', block_height)

    url = f"{API_HOST}/block/{block_height}"
    api_result = grequests.map([grequests.get(url)])[0]
    try:
        block = api_result.json()
    except Exception as e:
        print('url:', url)
        print(e)
        time.sleep(9999999)

    
    if block['status'] == 'fail':
        time.sleep(10)
    else:
        log.info('Downloading %s transactions for block %s (%s)', len(block['data']['txs']), block_height, percentage(block_height, block['data']['current_height']))
        print(f"Downloading {len(block['data']['txs'])} transactions for block {block_height} ({percentage(block_height, block['data']['current_height'])})")
        in_results = set()
        urls = []
        for tx in block['data']['txs']:
            tx_hash = tx['tx_hash']
            urls.append(f"{API_HOST}/transaction/{tx_hash}")
        
        responses = grequests.map(grequests.get(u) for u in urls)

        for api_result_tx in responses:
            result_tx = api_result_tx.json()
            if result_tx['data']['inputs'] is not None:
                for ins in result_tx['data']['inputs']:
                    for mixin in ins['mixins']:
                        in_results.add((mixin['public_key'], tx_hash))

        insert(db_connection, in_results)
        block_height += 1
        write_height(block_height)
