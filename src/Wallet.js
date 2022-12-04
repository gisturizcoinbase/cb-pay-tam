import React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import CBPay from './CBPay';

function Wallet() {
    const [walletStateVariables, setwalletStateVariables] = useState({
        walletAddress: "",
        balance: "",
        network: ""
    });

    async function connectWallet() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                let signer = provider.getSigner();
                const walletAddress = await signer.getAddress();
                let balance = ethers.utils.formatEther(await signer.getBalance());

                const network_name = await provider.getNetwork();
                const network = network_name.name;
                console.log(`network name ${network_name.name}`);
                console.log(`get wallet address ${walletStateVariables.walletAddress}`)
                setwalletStateVariables({
                    walletAddress,
                    balance,
                    network
                });

                // setWalletAddress(walletAddress);
                // setBalance(balance);
            } catch (error) {
                console.log('Error connecting...');
            }
        } else {
            alert('Coinbase wallet not detected');
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={connectWallet}
                >Connect to wallet</button>
                <h3>Wallet Address: {walletStateVariables.walletAddress}</h3>
                <h4>Balance= {walletStateVariables.balance} ETH</h4>
                <h4>Network Name: {walletStateVariables.network}</h4>
                <CBPay walletAddress={walletStateVariables.walletAddress}/>
            </header>
        </div>
    );
}

export default Wallet;