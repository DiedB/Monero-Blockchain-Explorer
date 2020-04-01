import React from 'react';
import { useParams } from 'react-router-dom';

import Intra from './Intra/Intra';
import styles from './Transaction.module.css';

const Transaction = props => {
    let { id } = useParams();

    return (
        <div>
            <table className={styles.TransactionInfo}>
                <tr className={styles.TitleRow}>
                    <td><h1>Transaction</h1></td>
                    <td><h3>{id}</h3></td>
                </tr>
                <tr>
                    <td><h2>Block</h2></td>
                    <td><h4>2066528</h4></td>
                </tr>
                <tr>
                    <td><h2>Output</h2></td>
                    <td><h4>total confidential</h4></td>
                </tr>
                <tr>
                    <td><h2>Fee</h2></td>
                    <td><h4>0.00000160340000 xmr</h4></td>
                </tr>
                <tr>
                    <td><h2>Size</h2></td>
                    <td><h4>2067 bytes</h4></td>
                </tr>
                <tr>
                    <td><h2>Mixin</h2></td>
                    <td><h4>10</h4></td>
                </tr>
                <tr>
                    <td><h2>Unlock</h2></td>
                    <td><h4>0</h4></td>
                </tr>
            </table >
            <Intra />
        </div >
    )
}

export default Transaction;