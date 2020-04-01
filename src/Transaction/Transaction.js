import React from 'react';
import { useParams } from 'react-router-dom';

import Intra from './Intra/Intra';
import styles from './Transaction.module.css';

const Transaction = props => {
    let { id } = useParams();

    return (
        <div>
            <div className={styles.Transaction}>
                <div><h1>Transaction</h1><h3>{id}</h3></div>
                <div><h2>Block</h2><p>2066528</p></div>
                <div><h2>Output</h2><p>total confidential</p></div>
                <div><h2>Fee</h2><p>0.00000160340000 XMR</p></div>
                <div><h2>Size</h2><p>2607 bytes</p></div >
                <div><h2>Mixin</h2><p>10</p></div >
                <div><h2>Unlock</h2><p>0</p></div >
            </div>
            <Intra />
        </div>
    )
}

export default Transaction;