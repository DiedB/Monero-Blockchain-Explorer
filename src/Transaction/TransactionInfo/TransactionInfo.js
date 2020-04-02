import React from 'react';

import styles from './TransactionInfo.module.css';

const TransactionInfo = ({ transactionInfo }) => (
    <div className={styles.TransactionInfo} >
        <table className={styles.TableTitle} >
            <thead>
                <tr>
                    <td><h1>Transaction</h1></td>
                    <td><h3>{transactionInfo.tx_hash}</h3></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><h2>Block</h2></td>
                    <td><h4>{transactionInfo.block_height}</h4></td>
                </tr>
                {/* <tr>
                    <td><h2>Output</h2></td>
                    <td><h4>total confidential</h4></td>
                </tr> */}
                <tr>
                    <td><h2>Fee</h2></td>
                    <td><h4>{transactionInfo.tx_fee / 1000000000000} XMR</h4></td>
                </tr>
                {/* <tr>
                    <td><h2>Size</h2></td>
                    <td><h4>2067 bytes</h4></td>
                </tr> */}
                <tr>
                    <td><h2>Mixin</h2></td>
                    <td><h4>{transactionInfo.mixin - 1 >= 0 ? transactionInfo.mixin - 1 : 0}</h4></td>
                </tr>
                {/* <tr>
                    <td><h2>Unlock</h2></td>
                    <td><h4>0</h4></td>
                </tr> */}
            </tbody>
        </table >
    </div>
);

export default TransactionInfo;