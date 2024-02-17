import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BctApi } from '../../agent';

import styles from './TransactionLink.module.css';

const TransactionLink = ({ blockInfo, txHash }) => {
    const [transactionHash, setTransactionHash] = useState(txHash);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTransactionHash = async () => {
            setIsLoading(true)
            
            //const transactionResult = await BctApi.getTransaction(blockInfo.block_no, blockInfo.public_key);
            //const { transactionId } = await transactionResult.json()
            const transactionId = blockInfo.tx_hash

            setTransactionHash(transactionId)
            setIsLoading(false)  
        }

        if (!transactionHash) {
            fetchTransactionHash();
        }
    })

    return !isLoading ? (
        <Link className={styles.TransactionLink} to={`/transaction/${transactionHash}`} />
    ) : null;
}

export default TransactionLink;