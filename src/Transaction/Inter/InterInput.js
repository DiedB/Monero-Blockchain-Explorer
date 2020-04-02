import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './InterInput.module.css';

const InterInput = props => {
    let { id } = useParams();

    return (

        <div className={styles.InterInput} />

    )
}

export default InterInput;