import React from 'react';
import { useParams } from 'react-router-dom';

import Intra from './Intra/Intra';

const Transaction = props => {
    let { id } = useParams();

    return (
        <div>
            <span>Transaction id {id}</span>
            <Intra />
        </div>
    )
}

export default Transaction;