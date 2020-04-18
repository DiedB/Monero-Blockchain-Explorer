import React from 'react';

import SearchBar from './SearchBar/SearchBar';

import styles from './Navigation.module.css';
import logo from './images/logo.png';

const Navigation = () => (
    <div className={styles.Navigation} >
        <img className={styles.Logo} src={logo} alt="BCT Monero Viewer" />
        <SearchBar className={styles.SearchBar} />
        {/* <Link to="/transaction/9fb5324265e78c43d55fffd101811dc97733527bb16496df38be11f4e3e0e1f4">Transaction example</Link> */}
    </div>
);

export default Navigation;