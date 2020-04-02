import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './InterOutput.module.css';

const InterOutput = props => {
    let { id } = useParams();

    return (

        <div className={styles.InterOutput}>

        </div>

    )
}

export default InterOutput;