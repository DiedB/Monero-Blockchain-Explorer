import React from 'react';
import { useParams } from 'react-router-dom';

import RingSignature from './RingSignature';
import IntraOutput from './IntraOutput'
import styles from './Intra.module.css';

const Intra = props => {
    let { id } = useParams();

    return (

        <div className={styles.Intra}>
            <div className={styles.SignatureContainer}>
                <RingSignature />

            </div>
            <div className={styles.TransactionNode}></div>
            <div className={styles.OutputsContainer}>
                {[0, 1, 2].map((value) => {
                    return <IntraOutput key={value} />
                })}
            </div>
        </div>

    )
}

export default Intra;