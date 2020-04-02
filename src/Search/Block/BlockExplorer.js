import React from 'react';
import { useParams } from 'react-router-dom';

import BlockElement from './BlockElement'
import styles from './BlockExplorer.module.css';

const BlockExplorer = props => {
    let { id } = useParams();

    return (
        <div className={styles.BlockExplorer}>
            {[...Array(50).keys()].map((value) => {
                return (
                    <BlockElement value={value} />)
            })}
        </div>
    )
}

export default BlockExplorer;