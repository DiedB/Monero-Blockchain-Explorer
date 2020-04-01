import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Search from './Search/Search';
import Transaction from './Transaction/Transaction';

import styles from './App.module.css';

function App() {
    return (
        <div className={styles.App}>
            <Router>
                <div className={styles.Navigation}>
                    <Link to="/transaction/9fb5324265e78c43d55fffd101811dc97733527bb16496df38be11f4e3e0e1f4">Transaction example</Link>
                </div>
                
                <Switch>
                    <Route path="/transaction/:id">
                        <Transaction />
                    </Route>
                    <Route path="/">
                        <Search />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
