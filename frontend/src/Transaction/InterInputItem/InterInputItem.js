import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BctApi } from '../../agent';

import styles from './InterInputItem.module.css';

const InterInputItem = ({ blockInfo }) => {
    const [transactionHash, setTransactionHash] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchTransactionHash = async () => {
            const transactionResult = await BctApi.getTransaction(blockInfo.block_no, blockInfo.public_key);
            const { transactionId } = await transactionResult.json()
    
            setTransactionHash(transactionId)
            setIsLoading(false)  
        }

        fetchTransactionHash();
    })

    return !isLoading ? (
        <Link className={styles.InterInputItem} to={`/transaction/${transactionHash}`}>
            <div  />
        </Link>
    ) : null;
}

export default InterInputItem;