import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import TransactionInfo from './TransactionInfo/TransactionInfo';
import RingSignature from './RingSignature/RingSignature';

import styles from './Transaction.module.css';

const Transaction = props => {
    let { id } = useParams();

    const [currentView, setCurrentView] = useState(true);

    return (
        <div className={styles.Transaction}>
            <TransactionInfo id={id} />
            <div className={styles.TransactionVisual}>
                <div>
                    {currentView ? (
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
                <div className={styles.TransactionNode} onClick={() => setCurrentView(!currentView)} />

                {/* Inter, right */}
                <div className={styles.OutputContainer}>
                    {currentView ?
                        [0, 1, 2].map((value) => <div className={styles.InterOutput} key={value} />)
                        :
                        [0, 1, 2].map((value) => {
                            return <div className={styles.IntraOutput} key={value} />
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Transaction;