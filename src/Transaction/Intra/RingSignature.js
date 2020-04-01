import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './RingSignature.module.css';

const RingSignature = props => {
    let { id } = useParams();

    return (
        <div className={styles.RingSpace}>
            <p> Hallo </p>
        </div>

    )
}

export default RingSignature;