import React from 'react';

import RingSignature from './RingSignature';
import IntraOutput from './IntraOutput'
import styles from './Intra.module.css';
import tstyles from '../Transaction.module.css'

const Intra = props => {
    return (
        <div className={styles.Intra}>
            <div className={styles.SignatureContainer}>
                <RingSignature />
            </div>
            <div className={tstyles.TransactionNode} onClick={props.switchView} />
            <div className={styles.OutputContainer}>
                {[0, 1, 2].map((value) => {
                    return <IntraOutput key={value} />
                })}
            </div>
        </div>
    )
}

export default Intra;