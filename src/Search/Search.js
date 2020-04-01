import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import styles from './Search.module.css';


const Search = props => {
    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    return (
        <div className={styles.Search}>
            <input className={styles.SearchBar} type="text" onChange={e => setSearchText(e.target.value)} value={searchText} />
            <button onClick={() => history.push(`/transaction/${searchText}`)}>Go to transaction</button>
        </div>
    )
}

export default Search;