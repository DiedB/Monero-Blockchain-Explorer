import React from 'react';
import { useParams } from 'react-router-dom';

import RingSignature from './RingSignature';
import styles from './Intra.module.css';

const Intra = props => {
    let { id } = useParams();

    return (

        <div className={styles.Intra}>
            <div className={styles.SignatureContainer}>
                hallo
            </div>
            <div className={styles.Transactionnode}>
                inhoud
            </div>
            <div className={styles.OutputsContainer}>
                hallo
            </div>
        </div>

    )
}

export default Intra;