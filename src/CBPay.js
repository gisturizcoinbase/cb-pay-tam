import React from 'react';
import { useEffect, useState } from 'react';
import { initOnRamp } from '@coinbase/cbpay-js';
import cbbutton from './images/button-cbPay-normal-generic.png';

function CoinbaseButton(props) {
    const [isReady, setIsReady] = useState(false);

    let walletAdd = props.walletAddress;

    useEffect(function () {  
        initOnRamp({
            appId: process.env.REACT_APP_APP_ID,
            target: '#cbpay-button-container',
            widgetParameters: {
                destinationWallets: [{
                    address: walletAdd,
                    blockchains: process.env.REACT_APP_BLOCKCHAINS,
             }],
            },
            onSuccess: function () {
                  // handle navigation when user successfully completes the flow
                  console.log("This was successful");
                  setIsReady(true);
            },
            onExit: function () {
                  // handle navigation from dismiss / exit events due to errors
                  console.log("Exited");
            },
            onEvent: function (event) {
                  // event stream
                  console.log("Event has occured");
            },
            experienceLoggedIn: 'embedded',
            experienceLoggedOut: 'popup',
        });
    },)

    // render with button from previous example
    return (
        <div>
            <a id="cbpay-button-container">
                <img src={cbbutton} alt="coinbase pay button"/>
            </a>
        </div>
    );
}

export default CoinbaseButton;