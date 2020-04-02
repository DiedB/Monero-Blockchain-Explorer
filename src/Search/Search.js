import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import SearchBar from './SearchBar'
import Transaction from '../Transaction/Transaction';

import styles from './Search.module.css';

const Search = props => {
    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    return (
        <div>
            <div className={styles.Search}>
                <SearchBar />
            </div>
        </div>
    )
}

export default Search;