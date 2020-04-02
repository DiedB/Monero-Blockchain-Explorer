import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './Inter.module.css';

const Inter = props => {
    let { id } = useParams();

    return (

        <div className={styles.Inter}>
            <div className={styles.InputContainer}></div>
            <div className={styles.TransactionNode}></div>
            <div className={styles.OutputsContainer}></div>
        </div >

    )
}

export default Inter;