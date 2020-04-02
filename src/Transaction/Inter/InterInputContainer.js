import React from 'react';
import { useParams } from 'react-router-dom';

import InterInput from './InterInput'
import styles from './Inter.module.css';

const InterInputContainer = props => {
    let { id } = useParams();

    return (

        <div className={styles.Inter}>
            <InterInput />
        </div >

    )
}

export default InterInputContainer;