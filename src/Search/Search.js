import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import styles from './Search.module.css';
import SearchBar from './SearchBar'
import Transaction from '../Transaction/Transaction';


const Search = props => {
    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    return (
        <div>
            <div className={styles.Search}>
                <SearchBar />
            </div>
            <hr className={styles.Line}></hr>=
        </div>
    )
}

export default Search;