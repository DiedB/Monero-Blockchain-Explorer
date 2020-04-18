import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import styles from './SearchBar.module.css';

const SearchBar = props => {
    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    return (
        <div className={props.className}>
            <input className={styles.SearchBar} type="text" onChange={e => setSearchText(e.target.value)} value={searchText} />
            <button className={styles.SearchButton} onClick={() => history.push(`/transaction/${searchText}`)}>Go to transaction</button>
        </div>
    )
}

export default SearchBar;