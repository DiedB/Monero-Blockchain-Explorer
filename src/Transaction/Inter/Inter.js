import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './Inter.module.css';
import InterInputItem from './InterInputItem';

const Inter = props => {
    let { id } = useParams();

    return (

        <div className={styles.Inter}>
            <div className={styles.InputContainer}>
                {[0, 1, 2].map((value) => {
                    return (<div className={styles.InterInput}>
                        {[0, 1, 2, 4].map((value) => {
                            return <InterInputItem key={value} />
                        })}
                    </div>)
                })}
            </div>
            <div className={styles.TransactionNode}></div>
            <div className={styles.OutputContainer}></div>
        </div >

    )
}

export default Inter;