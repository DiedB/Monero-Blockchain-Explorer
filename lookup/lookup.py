import json
import grequests
import datetime
import pymysql
import logging
from systemd import journal

# version Diederik

log = logging.getLogger('lookup')
log.addHandler(journal.JournaldLogHandler())
log.setLevel(logging.INFO)

def insert(db_conn, host, ins, outs):
    cursor = db_conn.cursor()

    sql = "INSERT INTO lookup (pk, tx_hash) VALUES (%s, %s)"
    cursor.executemany(sql, ins)
    db_conn.commit()

API_HOST = "http://localhost:8081"
MYSQL_HOST = "localhost"
LIMIT = 10
TOTAL_PAGES = 206406
START_PAGE = 48413

db_connection = pymysql.connect(
    host=MYSQL_HOST,
    port=3306,
    user="root",
    passwd="w4NG!jVLlC0NFh&33aUQ",
    db="bct_diederik"
)

for c in range(TOTAL_PAGES - START_PAGE):
    c = c + START_PAGE
    log.info('%s/%s', c, TOTAL_PAGES)

    url = f"{API_HOST}/api/transactions?page={c}&limit={LIMIT}"
    api_result = grequests.map([grequests.get(url)])[0]
    result = api_result.json()

    in_results = set()
    out_results = set()

    for block in result['data']['blocks']:
        urls = []

        for tx in block['txs']:
            # Transaction level
            tx_hash = tx['tx_hash']
            urls.append(f"{API_HOST}/api/transaction/{tx_hash}")

        responses = grequests.map(grequests.get(u) for u in urls)

        for api_result_tx in responses:
            result_tx = api_result_tx.json()

            if result_tx['data']['inputs'] is not None:
                for ins in result_tx['data']['inputs']:
                    for mixin in ins['mixins']:
                        in_results.add((mixin['public_key'], tx_hash))


    insert(db_connection, MYSQL_HOST, in_results, out_results)

