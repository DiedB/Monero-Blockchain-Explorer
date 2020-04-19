import React from 'react';

import styles from './TransactionInfo.module.css';

const TransactionInfo = ({ transactionInfo }) => {
    console.log(transactionInfo);

    const inputAmount = transactionInfo.inputs.length >= 0 ? transactionInfo.inputs.reduce((total, current) => total + current.amount, 0) / 1000000000000 : 0;
    const outputAmount = transactionInfo.outputs.length >= 0 ? transactionInfo.outputs.reduce((total, current) => total + current.amount, 0)/ 1000000000000 : 0;

    return (
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
                        <td><h4>{transactionInfo.amount}</h4></td>
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
                    <tr>
                        <td><h2>Input total</h2></td>
                        <td><h4>{inputAmount === 0 ? "Confidential" : inputAmount}</h4></td>
                    </tr>                <tr>
                        <td><h2>Output total</h2></td>
                        <td><h4>{outputAmount === 0 ? "Confidential" : outputAmount}</h4></td>
                    </tr>
                    {/* <tr>
                        <td><h2>Unlock</h2></td>
                        <td><h4>0</h4></td>
                    </tr> */}
                </tbody>
            </table >
        </div>
    );    
}

export default TransactionInfo;