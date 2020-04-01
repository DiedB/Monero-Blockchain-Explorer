import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './Intra.module.css';

const Intra = props => {
    let { id } = useParams();

    return (
        // <div className={styles.Intra}></div>

        <div className={styles.TransactionNode}></div>

    )
}

export default Intra;