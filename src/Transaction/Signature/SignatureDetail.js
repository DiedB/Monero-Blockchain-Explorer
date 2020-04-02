import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './SignatureDetail.module.css';

const SignatureDetail = props => {
    let { id } = useParams();

    return (
        <div className={styles.SignatureDetail}>
            <div className={styles.InfoGrid}>
                <div className={styles.Number}>10</div>
                <div className={styles.Title}>Key Image</div>
                <div className={styles.KeyImage}></div>
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
                    {[...Array(50).keys()].map((value) => {
                        return (
                            <tr key={value}>
                                <td className={styles.TableElement}><div className={styles.Element}></div></td>
                                <td>c4b49864602ecfdeefaa1b2c261dbcb4dbbd42a52e20f58bc03bda3514858283</td>
                                <td className={styles.TableContent}> 01604381</td>
                                <td className={styles.TableContent}> 4610b1b4ae217533efed099d26acc2fc3dd66d64eea3b519d0d8d66ce5559b48</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </div >
    )
}

export default SignatureDetail;