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

// Test env variables
if (typeof process.env.REACT_APP_PUBLIC_FRONTEND_URL === 'undefined') {
    console.log('process.env.REACT_APP_PUBLIC_FRONTEND_URL is undefined')
}

if (typeof process.env.REACT_APP_ONION_EXPLORER_HOST === 'undefined') {
    console.log('process.env.REACT_APP_REACT_APP_ONION_EXPLORER_HOST is undefined')
}

if (typeof process.env.REACT_APP_PUBLIC_API_URL === 'undefined') {
    console.log('process.env.REACT_APP_PUBLIC_API_URL is undefined')
}

if (typeof process.env.REACT_APP_API_PORT === 'undefined') {
    console.log('process.env.REACT_APP_API_PORT is undefined')
}

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
