import { Link } from 'react-router-dom';

import styles from './TransactionLink.module.css';

const TransactionLink = ({ blockInfo, txHash }) => {
    return <Link className={styles.TransactionLink} to={`/transaction/${txHash ?? blockInfo.tx_hash}`} />
}

export default TransactionLink;