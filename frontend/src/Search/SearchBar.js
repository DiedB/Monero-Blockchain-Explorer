import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import styles from './SearchBar.module.css';

const SearchBar = props => {
    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    return (
        <div>
            <input className={styles.SearchBar} type="text" onChange={e => setSearchText(e.target.value)} value={searchText} />
            <button onClick={() => history.push(`/transaction/${searchText}`)}>Go to transaction</button>
        </div>
    )
}

export default SearchBar;