import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';

import { BctApi } from '../../agent';

import styles from './Chart.module.css';

import _ from 'underscore';

const Chart = ({ id }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // eslint-disable-next-line no-extend-native
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const createDatapoints = (start_monero, dates) => {
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
   
    function smooth(list, degree) {
        var win = degree*2-1;
        var weight = _.range(0, win).map(function (x) { return 1.0; });
        var weightGauss = [];
        for (let i in _.range(0, win)) {
            i = i-degree+1;
            var frac = i/win;
            var gauss = 1 / Math.exp((4*(frac))*(4*(frac)));
            weightGauss.push(gauss);
        }
        weight = _(weightGauss).zip(weight).map(function (x) { return x[0]*x[1]; });
        var smoothed = _.range(0, (list.length+1)-win).map(function (x) { return 0.0; });
        for (let i=0; i < smoothed.length; i++) {
            smoothed[i] = _(list.slice(i, i+win)).zip(weight).map(function (x) { return x[0]*x[1]; }).reduce(function (memo, num){ return memo + num; }, 0) / _(weight).reduce(function (memo, num){ return memo + num; }, 0);
        }
        return smoothed;
    }

    useEffect(() => {
        const fetchGraph = async () => {
            const graphData = await BctApi.getGraph(id);
            const graphJson = await graphData.json();
            
            graphJson.sort();
            const res = createDatapoints(new Date(graphJson[0] * 1000), graphJson);
            
            const smoothed_res = [res[0], smooth(res[1], 5)];

            const data = {
                labels: smoothed_res[0].map(y => y.toDateString()),
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
                        data: smoothed_res[1]
                    }
                ]
            };
            setData(data);
            setIsLoading(false);
        }

        fetchGraph();
    }, [id]);

    // Chart.js options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                    display:false,
                    drawBorder: false,
                }   
            }]
        }    
    }

    return isLoading ? "Loading..." : (
        <div className={styles.Chart}>
            <Line data={data} options={options} />
        </div>
    );
};

export default Chart;