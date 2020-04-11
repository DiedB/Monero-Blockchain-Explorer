import React from 'react';
import cx from 'classnames';

import styles from './TransactionNode.module.css';

const TransactionNode = ({ currentView, toggleView }) => (
    <div className={cx([styles.TransactionNode, { [styles.Inter]: currentView, [styles.Intra]: !currentView }])} onClick={toggleView}>
        ?
    </div>
);

export default TransactionNode;