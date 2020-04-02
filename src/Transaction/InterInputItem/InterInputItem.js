import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { OnionApi } from '../../agent';

import styles from './InterInputItem.module.css';

const InterInputItem = ({ blockInfo }) => {
    const [transactionHash, setTransactionHash] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionHash = async () => {
            const blockResult = await OnionApi.getBlock(blockInfo.block_no);
            const block = await blockResult.json();

            for (let blockTransaction of block.data.txs) {
                const transactionResult = await OnionApi.getTransaction(blockTransaction.tx_hash);
                const transaction = await transactionResult.json();

                for (let transactionOutput of transaction.data.outputs) {
                    if (transactionOutput.public_key === blockInfo.public_key) {
                        setTransactionHash(blockTransaction.tx_hash);
                        setIsLoading(false);
                        return
                    }
                }
            }
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