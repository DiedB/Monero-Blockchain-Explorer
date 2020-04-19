import React from 'react';
import { Link } from 'react-router-dom';

import styles from './RingSignature.module.css';

const RingSignature = props => {
    // let result = [];

    // let ringRadius = 50;
    // let inputKeys = props.inputKeys;

    // var div = 360 / inputKeys;

    // for (var i = 1; i <= inputKeys; ++i) {
    //     var y = Math.sin(Math.PI * 2 * i / inputKeys) * ringRadius;
    //     var x = Math.cos(Math.PI * 2 * i / inputKeys) * ringRadius;
    //     console.log(x, y)
    //     let styling = {
    //         width: "25px",
    //         height: "25px",
    //         backgroundColor: "#C093D6",
    //         borderRadius: "50%"
    //     }
    //     result[i] = [styling, i];
    // }



    return (
        <Link to={`/signature/${props.txHash}/${props.keyImage}`}>
            <div className={styles.Ring}>
                <p>{props.mixin}</p>
            </div>
        </Link>

    )
}

export default RingSignature;