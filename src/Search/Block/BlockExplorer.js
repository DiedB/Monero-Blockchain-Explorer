import React from 'react';

import BlockElement from './BlockElement'
import styles from './BlockExplorer.module.css';

const BlockExplorer = props => {
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