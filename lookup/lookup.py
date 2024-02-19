import json
import grequests
import datetime
import pymysql
import logging
from cysystemd import journal
import os

# version Diederik

log = logging.getLogger('lookup')
log.addHandler(journal.JournaldLogHandler())
log.setLevel(logging.INFO)

def insert(db_conn, ins):
    cursor = db_conn.cursor()

    sql = "INSERT INTO lookup (pk, tx_hash) VALUES (UNHEX(%s), UNHEX(%s))"
    cursor.executemany(sql, ins)
    db_conn.commit()

API_HOST = os.environ['REACT_APP_ONION_EXPLORER_HOST']
LIMIT = 10
TOTAL_PAGES = 206406
START_PAGE = 48413

db_connection = pymysql.connect(
    host = os.environ['MYSQL_HOST'],
    port = 3306,
    user = os.environ['MYSQL_USER'],
    passwd = os.environ['MYSQL_PASSWORD'],
    db = os.environ['MYSQL_DATABASE']
)

for c in range(TOTAL_PAGES - START_PAGE):
    print('Downloading page ' + str(c))
    c = c + START_PAGE
    log.info('%s/%s', c, TOTAL_PAGES)

    url = f"{API_HOST}/transactions?page={c}&limit={LIMIT}"
    api_result = grequests.map([grequests.get(url)])[0]
    result = api_result.json()

    in_results = set()

    for block in result['data']['blocks']:
        print('  Downloading txes for block ' + str(block['height']) + ' ' + block['timestamp_utc'])
        urls = []

        for tx in block['txs']:
            tx_hash = tx['tx_hash']
            # print('    Downloading tx ' + tx_hash)
            urls.append(f"{API_HOST}/transaction/{tx_hash}")

        responses = grequests.map(grequests.get(u) for u in urls)

        for api_result_tx in responses:
            result_tx = api_result_tx.json()

            if result_tx['data']['inputs'] is not None:
                for ins in result_tx['data']['inputs']:
                    for mixin in ins['mixins']:
                        in_results.add((mixin['public_key'], tx_hash))

    insert(db_connection, in_results)

