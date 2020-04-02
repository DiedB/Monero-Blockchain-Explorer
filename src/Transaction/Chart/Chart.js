import React, { useState, useEffect } from 'react';
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

    const dateAmount = 20;

    function createDatapoints(dates) {
        const start_monero = new Date(2014, 4, 18)
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

                if (temp_dates.length >= dateAmount) {
                    const res = createDatapoints(temp_dates)

                    const data = {
                        labels: res[0].map(y => y.toString()),
                        datasets: [
                            {
                                label: 'Monero time',
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
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

    return isLoading ? "Loading..." : (
        <Line data={data} />
    );
};

export default Chart;