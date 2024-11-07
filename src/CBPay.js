import React from 'react';
import { useState, useEffect } from 'react';
import cbbutton from './images/button-cbPay-normal-generic.png';
import { initOnRamp } from '@coinbase/cbpay-js';

function PayWithCoinbaseButton({ walletAddress }) {
    const [onrampInstance, setOnrampInstance] = useState();
    const [mount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
        console.log(walletAddress)

        if (mount) {
            initOnRamp({
                appId: "f3a88f2a-3d1d-4110-885c-ff826e0c9a84",
                widgetParameters: {
                    destinationWallets: [
                        {
                            address: walletAddress,
                            blockchains: ["ethereum", "base"],
                        },
                    ],
                    defaultNetwork: "base",
                    // Default Buy
                    // defaultExperience: "buy",
                    // One Click Buy:
                    // presetFiatAmount: 10,
                    // fiatCurrency: "USD",
                    // defaultAsset: "ETH",
                    // defaultPaymentMethod: "CARD"
                    // partnerUserId: example_random_string
                    // redirectUrl: https://www.sample.com
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
                experienceLoggedIn: 'popup', //new_tab
                experienceLoggedOut: 'popup', //new_tab
                closeOnExit: true,
                closeOnSuccess: true,
            }, (_, instance) => {
                setOnrampInstance(instance);
            });

            return () => {
                onrampInstance?.destroy();
            };
        }
    }, [onrampInstance, walletAddress]);

    const handleClick = () => {
        onrampInstance?.open();
    };

    
    return (
        // eslint-disable-next-line
        <a onClick={handleClick} disabled={!onrampInstance}>
            <img src={cbbutton} alt="coinbase pay button" />
        </a>
    );
};

export default PayWithCoinbaseButton;