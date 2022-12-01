import React from 'react';
import cbbutton from './images/button-cbPay-normal-generic.png';

export default function BuyWithCoinbaseButton() {
    return (
        <div>
            <a id="cbpay-button-container">
                <img src={cbbutton} alt="coinbase pay button"/>
            </a>
        </div>
    )
}
