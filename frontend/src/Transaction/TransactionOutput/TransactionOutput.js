import React, { useState, useEffect } from 'react';

import TransactionLink from '../TransactionLink/TransactionLink';

import { BctApi } from '../../agent';

import styles from './TransactionOutput.module.css';

const TransactionOutput = ({ publicKey }) => {
    const [outputs, setOutputs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchOutputs = async () => {
            const outputResult = await BctApi.getOutput(publicKey);
            const output = await outputResult.json();

            setOutputs(output);
            setIsLoading(false);
        }

        fetchOutputs();
    }, [publicKey])

    return !isLoading ? (
        <div className={styles.TransactionOutput}>
            { outputs.map((txHash) => <TransactionLink txHash={txHash} key={txHash} />) }
        </div>
    ) : null;
}

export default TransactionOutput;