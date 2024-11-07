import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import CBPay from "./CBPay";

function Wallet() {
  const [walletStateVariables, setwalletStateVariables] = useState({
    walletAddress: "",
    balance: "",
    network: "",
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
        console.log(`get wallet address ${walletStateVariables.walletAddress}`);
        setwalletStateVariables({
          walletAddress,
          balance,
          network,
        });
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Coinbase wallet not detected");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: "#00aaff", // Light blue color
            color: "#ffffff", // White text
            border: "none",
            borderRadius: "12px", // Rounded corners
            padding: "10px 20px", // Spacing inside the button
            fontSize: "16px", // Font size
            fontFamily: "Arial, sans-serif", // Sans-serif font
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for a modern look
            transition: "background-color 0.3s", // Smooth hover transition
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0099cc")} // Darker shade on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = "#00aaff")}
        >
          Connect to Wallet
        </button>
        <h3>Wallet Address: {walletStateVariables.walletAddress}</h3>
        <h4>Balance= {walletStateVariables.balance} ETH</h4>
        <h4>Network Name: {walletStateVariables.network}</h4>
        <CBPay walletAddress={walletStateVariables.walletAddress} />
      </header>
    </div>
  );
}

export default Wallet;
