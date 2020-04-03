import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';

import { OnionApi } from '../../agent';

const Chart = ({ id }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // eslint-disable-next-line no-extend-native
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const dateAmount = 25;

    function createDatapoints(start_monero, dates) {
        const xs = getDates(start_monero, Date.now())
        const ys = new Array(xs.length).fill(0);
        dates.forEach(d => {
            ys[getDateDifference(start_monero, new Date(d * 1000))] += 1;
        });

        return [xs, ys]
    }

    function getDateDifference(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    function getDates(startDate, stopDate) {
        let dateArray = [];
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    var arrSum = arr => arr.reduce((a,b) => a + b, 0);


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

                temp_dates.push(transaction.data.timestamp);

                if (transaction.data.inputs) { // if statement added, no idea why but some are null (maybe mining rewards?)
                    for (let input of transaction.data.inputs) {
                        for (let inputMixin of input.mixins) {
                            const transactionHash = await fetchTransactionHash(inputMixin.block_no, inputMixin.public_key);
                            transactionList.push(transactionHash);

                            const txResult = await OnionApi.getTransaction(transactionHash);
                            const tx = await txResult.json();

                            temp_dates.push(tx.data.timestamp);

                            if (temp_dates.length >= dateAmount) {
                                break
                            }
                        }
                        if (temp_dates.length >= dateAmount) {
                            break
                        }
                    }
                }

                if (temp_dates.length >= dateAmount) {
                    let temp_temp_dates = temp_dates;
                    temp_temp_dates.sort();

                    const res = createDatapoints(new Date(temp_temp_dates[0] * 1000), temp_dates)

                    const data = {
                        labels: res[0].map(y => y.toDateString()),
                        datasets: [
                            {
                                label: 'Monero time',
                                fill: true,
                                lineTension: 0.3,
                                backgroundColor: '#98F1CB',
                                borderColor: '#98F1CB',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgba(75,192,192,1)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: res[1]
                            }
                        ]
                    };
                    setData(data);
                    setIsLoading(false);

                    break
                }
            }
        }

        fetchDatesForMark();
    }, [id]);

    // Chart.js options
    const options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                }   
            }]
        }    
    }

    return isLoading ? "Loading..." : (
        <Line data={data} options={options} width={1350} height={400} />
    );
};

export default Chart;