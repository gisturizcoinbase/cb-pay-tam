import React from 'react';
import { useState, useEffect } from 'react';
import cbbutton from './images/button-cbPay-normal-generic.png';
import { initOnRamp } from '@coinbase/cbpay-js';

function PayWithCoinbaseButton({ walletAddress }) {
    const [onrampInstance, setOnrampInstance] = useState();

    useEffect(() => {
        console.log(walletAddress)
        initOnRamp({
            appId: process.env.REACT_APP_APP_ID,
            widgetParameters: {
                destinationWallets: [
                    {
                        address: walletAddress,
                        blockchains: ["ethereum"],
                    },
                ],
            },
            onSuccess: () => {
                console.log('success');
            },
            onExit: () => {
                console.log('exit');
            },
            onEvent: (event) => {
                console.log('event', event);
            },
            experienceLoggedIn: 'popup',
            experienceLoggedOut: 'popup',
            closeOnExit: true,
            closeOnSuccess: true,
        }, (_, instance) => {
            setOnrampInstance(instance);
        });

        return () => {
            onrampInstance?.destroy();
        };
    }, [onrampInstance, walletAddress]);

    const handleClick = () => {
        onrampInstance?.open();
    };

    // eslint-disable-next-line
    return (
        <a onClick={handleClick} disabled={!onrampInstance}>
            <img src={cbbutton} alt="coinbase pay button" />
        </a>
    );
};

export default PayWithCoinbaseButton;