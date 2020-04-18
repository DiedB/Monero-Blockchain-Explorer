import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Navigation from './Navigation/Navigation';
import Transaction from './Transaction/Transaction';
import SignatureDetail from './SignatureDetail/SignatureDetail';

import styles from './App.module.css';

function App() {
    return (
        <div className={styles.App}>
            <Router>
                <Navigation />
                <Switch>
                    <Route path="/transaction/:id">
                        <Transaction />
                    </Route>
                    <Route path="/signature/:txHash/:keyImage">
                        <SignatureDetail />
                    </Route>
                    {/* <Route path="/">
                        <Search />
                    </Route> */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
