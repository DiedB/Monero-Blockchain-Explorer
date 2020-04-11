import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import { OnionApi } from '../agent';

import TransactionInfo from './TransactionInfo/TransactionInfo';
import TransactionNode from './TransactionNode/TransactionNode';
import RingSignature from './RingSignature/RingSignature';
import InterInputItem from './InterInputItem/InterInputItem';

import Chart from './Chart/Chart';

import SearchBar from '../Search/SearchBar';

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
        }

        fetchTransactionInfo();
    }, [id])

    return !isLoading ? (
        <div className={styles.Transaction}>
            <SearchBar />
            <TransactionInfo transactionInfo={transactionInfo} />
            <div className={styles.TransactionVisual}>
                <div>
                    {currentView ? (
                        <div className={styles.InterInputContainer}>
                            {transactionInfo.inputs && [...Array(transactionInfo.inputs.length).keys()].map(i => (
                                <div className={styles.InterInput} key={(i)}>
                                    {[...Array(transactionInfo.inputs[i].mixins.length).keys()].map(j => <InterInputItem blockInfo={transactionInfo.inputs[i].mixins[j]} key={j} />)}
                                </div>
                            ))}
                        </div>
                    ) : (
                            <div>
                                {transactionInfo.inputs && [...Array(transactionInfo.inputs.length).keys()].map(i => (
                                    <div key={(i)}>
                                        <RingSignature txHash={transactionInfo.tx_hash} keyImage={transactionInfo.inputs[i].key_image} />
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

                <TransactionNode currentView={currentView} toggleView={() => setCurrentView(!currentView)} />

                {/* Inter, right */}
                <div className={styles.OutputContainer}>
                    {[...Array(transactionInfo.outputs.length).keys()].map((value) => <div className={cx({ [styles.InterOutput]: currentView, [styles.IntraOutput]: !currentView })} key={value} />)}
                </div>
            </div>
            <Chart id={id} />
        </div >
    ) : "Loading...";
}

export default Transaction;