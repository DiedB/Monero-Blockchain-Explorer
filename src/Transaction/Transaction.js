import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { OnionApi } from '../agent';

import TransactionInfo from './TransactionInfo/TransactionInfo';
import TransactionNode from './TransactionNode/TransactionNode';
import RingSignature from './RingSignature/RingSignature';

import styles from './Transaction.module.css';

const Transaction = props => {
    let { id } = useParams();

    const [currentView, setCurrentView] = useState(true);
    const [transactionInfo, setTransactionInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionInfo = async () => {
            const transactionResult = await OnionApi.getTransaction(id);
            const transaction = await transactionResult.json();
            
            setTransactionInfo(transaction.data);
            setIsLoading(false);
        }

        fetchTransactionInfo();
    }, [id])

    return !isLoading ? (
        <div className={styles.Transaction}>
            <TransactionInfo transactionInfo={transactionInfo} />
            <div className={styles.TransactionVisual}>
                <div>
                    { currentView ? (
                        <div className={styles.InterInputContainer}>
                            {[0, 1, 3, 4].map((value) => (
                                <div className={styles.InterInput} key={(value + 1) * 100}>
                                    {[...Array(17).keys()].map((value) => <div className={styles.InterInputItem} key={value} />)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <RingSignature />
                    )}
                </div>

                <TransactionNode currentView={currentView} toggleView={() => setCurrentView(!currentView)} />

                {/* Inter, right */}
                <div className={styles.OutputContainer}>
                    { currentView ?
                        [0, 1, 2].map((value) => <div className={styles.InterOutput} key={value} />)
                    : 
                        [0, 1, 2].map((value) => {
                            return <div className={styles.IntraOutput} key={value} />
                        })
                    }
                </div>
            </div>
        </div >
    ) : "Loading...";
}

export default Transaction;