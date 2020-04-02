import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './RingSignature.module.css';

const Test = ({ value }) => {

    return <p>{value}</p>
}

const RingSignature = props => {
    let { id } = useParams();

    let result = [];

    let ringRadius = 50;
    let inputKeys = 2;

    var div = 360 / inputKeys;

    for (var i = 1; i <= inputKeys; ++i) {
        var y = Math.sin(Math.PI * 2 * i / inputKeys) * ringRadius;
        var x = Math.cos(Math.PI * 2 * i / inputKeys) * ringRadius;
        console.log(x, y)
        let styling = {
            width: "25px",
            height: "25px",
            backgroundColor: "#C093D6",
            borderRadius: "50%"
        }
        result[i] = [styling, i];
    }



    return (
        <div className={styles.Ring}>
            {result.map((value) => {
                return <div style={value[0]} key={value[1].toString()} />
            })}
        </div>

    )
}

export default RingSignature;