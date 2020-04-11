import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './IntraOutput.module.css';

const IntraOutput = props => {
    let { id } = useParams();

    return (

        <div className={styles.IntraOutput}>

        </div>

    )
}

export default IntraOutput;