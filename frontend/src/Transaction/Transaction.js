import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { OnionApi } from '../agent';

import TransactionInfo from './TransactionInfo/TransactionInfo';
import TransactionNode from './TransactionNode/TransactionNode';
import RingSignature from './RingSignature/RingSignature';
import TransactionLink from './TransactionLink/TransactionLink';
import TransactionOutput from './TransactionOutput/TransactionOutput';

import Chart from './Chart/Chart';

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

            if (transaction.status === "fail") {
                setTransactionInfo(null);
            } else {
                setTransactionInfo(transaction.data);
            }

            setIsLoading(false);
        }

        fetchTransactionInfo();
    }, [id])

    if (!isLoading && transactionInfo !== null) {
        return (
            <div className={styles.Transaction}>
                <TransactionInfo transactionInfo={transactionInfo} />
                <div className={styles.TransactionVisual}>
                    <span className={styles.VisualLegend}>Inputs</span>
                    <div />
                    <span className={styles.VisualLegend}>Transaction</span>
                    <div />
                    <span className={styles.VisualLegend}>Outputs</span>

                    <div>
                        {currentView ? (
                            <div className={styles.InterInputContainer}>
                                {transactionInfo.inputs && [...Array(transactionInfo.inputs.length).keys()].map(i => (
                                    <div className={styles.InterInput} key={(i)}>
                                        {[...Array(transactionInfo.inputs[i].mixins.length).keys()].map(j => <TransactionLink blockInfo={transactionInfo.inputs[i].mixins[j]} key={j} />)}
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

                    <div className={styles.VerticalSeparator} />

                    <TransactionNode currentView={currentView} toggleView={() => setCurrentView(!currentView)} />

                    <div className={styles.VerticalSeparator} />

                    {/* Inter, right */}
                    <div className={styles.OutputContainer}>
                        {[...Array(transactionInfo.outputs.length).keys()].map((i) => (
                            <TransactionOutput publicKey={transactionInfo.outputs[i].public_key} />
                        ))}
                    </div>
                </div>
                <Chart id={id} />
            </div >
        )
    } else {
        return (
            <div className={styles.Transaction}>
                <span className={styles.InfoText}>{isLoading ? "Please wait..." : "Please enter a valid transaction ID to use the block explorer"}</span>
            </div>
        )
    }
}

export default Transaction;