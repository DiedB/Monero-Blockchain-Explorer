import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './BlockElement.module.css';

const BlockExplorer = props => {
    return (
        <div>
            <div className={styles.Arrow} /><div className={styles.Block}>{props.value}</div>
        </div>
    )
}

export default BlockExplorer;