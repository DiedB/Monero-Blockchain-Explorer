import { useState, useEffect } from 'react';

import { OnionApi } from '../../agent';

const Chart = ({ id }) => {
    const [dates, setDates] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const dateAmount = 20;

    useEffect(() => {
        const fetchTransactionHash = async (blockNumber, publicKey) => {
            const blockResult = await OnionApi.getBlock(blockNumber);
            const block = await blockResult.json();
    
            for (let blockTransaction of block.data.txs) {
                const transactionResult = await OnionApi.getTransaction(blockTransaction.tx_hash);
                const transaction = await transactionResult.json();
    
                for (let transactionOutput of transaction.data.outputs) {
                    if (transactionOutput.public_key === publicKey) {
                        return blockTransaction.tx_hash
                    }
                }
            }
        }
    
        const fetchDatesForMark = async () => {
            const transactionList = [id];
            const temp_dates = [];
    
            // Current timestamp
            while (true) {
                const txId = transactionList.pop();
    
                const transactionResult = await OnionApi.getTransaction(txId);
                const transaction = await transactionResult.json();
    
                temp_dates.push(transaction.data.timestamp_utc);
    
                for (let input of transaction.data.inputs) {
                    for (let inputMixin of input.mixins) {
                        const transactionHash = await fetchTransactionHash(inputMixin.block_no, inputMixin.public_key);
                        transactionList.push(transactionHash);
        
                        const txResult = await OnionApi.getTransaction(transactionHash);
                        const tx = await txResult.json();
            
                        temp_dates.push(tx.data.timestamp_utc);
    
                        if (temp_dates.length >= dateAmount) {
                            break
                        }
                    }
                    if (temp_dates.length >= dateAmount) {
                        break
                    }
                }
    
                if (temp_dates.length >= dateAmount) {
                    setDates(temp_dates);
                    setIsLoading(false);
    
                    break
                }
            }
        }
    
        fetchDatesForMark();    
    }, [id]);

    return isLoading ? "Loading..." : dates;
};

export default Chart;