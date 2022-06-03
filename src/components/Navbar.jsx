import React, {useState} from 'react'
import { ethers } from 'ethers';
const Navbar = () => {
  const [account,setAccount] = useState("");
  const connectWallet = async() => 
  {
    if(window.ethereum)
    {
        const result = await window.ethereum.request({method:'eth_requestAccounts'});
        setAccount(result[0]);
    }
    else 
    {
        console.log("error");
    }
  }
  return (
    <>
    <div className="main_wrapper">
      <div className="nav">
        <div className="left">
          <h1>Minting Bot</h1>
        </div>
        <div className="right">
          <button onClick={connectWallet}>{account ? 'Connected' : 'Connect Wallet'}</button>
        </div>
      </div>
      <div className="hero">
        <div className="left">
          <h1>Minting Bot</h1>
          <p>
            This bot is useful to mint NFT among so many people in public sale.<br/>
            Every NFT has their own active mint function or start mint block number or start mint timestamp
          </p>
        </div>
        <div className="right">
          <img src="https://lh3.googleusercontent.com/lCHsWnDxHw9Osijae-wcdqIImOYRuonlNjOov84t0xjenD-mLfbeXfspUDLCUzho-lnMJPoEKvYQweS6Qtq4LHQKj3OuDntV8ejueqQ=w600" alt="" />
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar