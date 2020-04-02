import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './InterInputItem.module.css';

const InterInputItem = props => {
    let { id } = useParams();

    return (
        <div className={styles.InterInputItem}></div>

    )
}

export default InterInputItem;