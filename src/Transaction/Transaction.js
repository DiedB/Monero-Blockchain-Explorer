import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import { OnionApi } from '../agent';

import TransactionInfo from './TransactionInfo/TransactionInfo';
import TransactionNode from './TransactionNode/TransactionNode';
import RingSignature from './RingSignature/RingSignature';
import InterInputItem from './InterInputItem/InterInputItem';

import styles from './Transaction.module.css';

const Transaction = () => {
    let { id } = useParams();

    const [currentView, setCurrentView] = useState(true);
    const [transactionInfo, setTransactionInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchTransactionInfo = async () => {
            const transactionResult = await OnionApi.getTransaction(id);
            const transaction = await transactionResult.json();

            setTransactionInfo(transaction.data);
            setIsLoading(false);
            console.log(transaction.data)
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
                            {transactionInfo.inputs && [...Array(transactionInfo.inputs.length).keys()].map(i => (
                                <div className={styles.InterInput} key={(i + 1) * 100}>
                                    {[...Array(transactionInfo.inputs[i].mixins.length).keys()].map(j => <InterInputItem blockInfo={transactionInfo.inputs[i].mixins[j]} key={j} />)}
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
                    {[...Array(transactionInfo.outputs.length).keys()].map((value) => <div className={cx({ [styles.InterOutput]: currentView, [styles.IntraOutput]: !currentView })} key={value} />)}
                </div>
            </div>
        </div >
    ) : "Loading...";
}

export default Transaction;