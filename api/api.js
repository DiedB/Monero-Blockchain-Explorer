const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fetch = require("node-fetch");


// Test env variables
if (typeof process.env.ONION_EXPLORER_HOST === 'undefined')
    console.log('ERROR: process.env.ONION_EXPLORER_HOST is undefined')
if (typeof process.env.MYSQL_HOST === 'undefined')
    console.log('ERROR: process.env.MYSQL_HOST is undefined')
if (typeof process.env.MYSQL_USER === 'undefined')
    console.log('ERROR: process.env.MYSQL_USER is undefined')
if (typeof process.env.MYSQL_PASSWORD === 'undefined')
    console.log('ERROR: process.env.MYSQL_PASSWORD is undefined')
if (typeof process.env.MYSQL_DATABASE === 'undefined')
    console.log('ERROR: process.env.MYSQL_DATABASE is undefined')


const ONION_EXPLORER_HOST = process.env.ONION_EXPLORER_HOST
const DB_PARAMS = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

const app = express();
app.use(cors());

// Endpoints
app.get("/output/:pk", async (req, res, next) => {
    const publicKey = req.params.pk;

    const dbConnection = await mysql.createConnection(DB_PARAMS);
    const [rows, _] = await dbConnection.execute("SELECT tx_hash FROM lookup WHERE pk = ?", [publicKey]);

    let result = [];
    for (let row of rows) {
        result.push(row.tx_hash);
    }

    res.json(result);
});

app.get("/transaction/:blockNumber/:publicKey", async (req, res, next) => {
    const { publicKey, blockNumber } = req.params;

    const transactionId = await fetchTransactionHash(blockNumber, publicKey);

    res.json({ transactionId });
});

app.get("/graph/:tx_hash/:steps_backward?", async (req, res, next) => {
    const tx_hash = req.params.tx_hash;
    const steps_backward = req.params.steps_backward || 1;
    res.json(await fetchDatesForGraph(tx_hash, steps_backward))
});

// Onion API proxy helpers
const getRequest = (url) => {
    return fetch(url);
}

const OnionApi = {
    getTransaction: (id) => getRequest(`${ONION_EXPLORER_HOST}/transaction/${id}`),
    getBlock: (id) => getRequest(`${ONION_EXPLORER_HOST}/block/${id}`),
}

// Helper functions
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

const fetchDatesForGraph = async (id, steps) => {
    const transactionList = [id];
    const temp_dates = [];

    // Current timestamp
    for (let step = 0; step < steps; step++) {
        const txId = transactionList.pop();

        const transactionResult = await OnionApi.getTransaction(txId);
        const transaction = await transactionResult.json();

        temp_dates.push(transaction.data.timestamp);

        if (transaction.data.inputs) {
            for (let input of transaction.data.inputs) {
                for (let inputMixin of input.mixins) {
                    if (step < steps - 1){
                        const transactionHash = await fetchTransactionHash(inputMixin.block_no, inputMixin.public_key);
                        transactionList.push(transactionHash);

                        const txResult = await OnionApi.getTransaction(transactionHash);
                        const tx = await txResult.json();

                        temp_dates.push(tx.data.timestamp);
                    }
                    else {
                        const blockResult = await OnionApi.getBlock(inputMixin.block_no);
                        const block = await blockResult.json();
                        temp_dates.push(block.data.timestamp);
                    }
                    
                }
            }
        }
    }

    return temp_dates;
}

app.listen(3001, () => {
    console.log("API server is running");
});
