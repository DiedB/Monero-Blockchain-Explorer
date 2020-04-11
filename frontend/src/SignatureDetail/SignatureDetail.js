import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { OnionApi } from '../agent';

import styles from './SignatureDetail.module.css';

const SignatureDetail = props => {
    let { txHash, keyImage } = useParams();

    const [signatureArray, setSignatureArray] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

        const fetchAll = async () => {
            setIsLoading(true);

            const results = [];

            const transactionResult = await OnionApi.getTransaction(txHash);
            const transaction = await transactionResult.json();

            const inputList = transaction.data.inputs.filter(input => input.key_image === keyImage)[0];

            console.log(inputList);

            for (let inputMixin of inputList.mixins) {
                const transactionHash = await fetchTransactionHash(inputMixin.block_no, inputMixin.public_key);

                results.push({ blockNumber: inputMixin.block_no, publicKey: inputMixin.public_key, transactionHash })
            }

            setSignatureArray(results);
            setIsLoading(false);
        }

        fetchAll();
    }, [txHash, keyImage])

    return !isLoading ? (
        <div className={styles.SignatureDetail}>
            <div className={styles.InfoGrid}>
                <div className={styles.Number}>10</div>
                <div className={styles.Title}>Key Image</div>
                <div className={styles.KeyImage}>{keyImage}</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td className={styles.TableElement} />
                        <td>Public Key</td>
                        <td className={styles.TableContent}>Block</td>
                        <td className={styles.TableContent}>Transaction</td>
                    </tr>
                </thead>
                <tbody>
                    {signatureArray.map(signature => {
                        return (
                            <tr key={signature.publicKey}>
                                <td className={styles.TableElement}><div className={styles.Element}></div></td>
                                <td>{signature.publicKey}</td>
                                <td className={styles.TableContent}>{signature.blockNumber}</td>
                                <td className={styles.TableContent}><Link to={`/transaction/${signature.transactionHash}`}>{signature.transactionHash}</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </div >
    ) : "Loading...";
}

export default SignatureDetail;