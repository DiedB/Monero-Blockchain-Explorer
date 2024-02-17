import { Link } from 'react-router-dom';

import styles from './TransactionLink.module.css';

const TransactionLink = ({ blockInfo }) => {

    return <Link className={styles.TransactionLink} to={`/transaction/${blockInfo.tx_hash}`} />
}

export default TransactionLink;