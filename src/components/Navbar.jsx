import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import bot from '../asset/bot.png';
import { fetchUser } from '../store/ConnectSlice';
const Navbar = () => {
  
  const dispatch = useDispatch()
  const {account} = useSelector(state => state.connectReducer);
  const connectWallet = async() => 
  {
    dispatch(fetchUser());
  }
  return (
    <>
    <div className="main_wrapper">
      <div className="nav">
        <div className="left">
          <h1>FU-FRENS MINTING BOT</h1>
        </div>
        <div className="right">
          <button onClick={connectWallet}>{account.length > 0 ? 'Connected' : 'Connect Wallet'}</button>
        </div>
      </div>
      <div className="hero">
        <div className="left">
          <h1>FU-FRENS MINTING BOT</h1>
          <p>
            This bot is useful to mint NFT among so many people in public sale.<br/>
            Every NFT has their own active mint function or start mint block number or start mint timestamp
          </p>
        </div>
        <div className="right">
          <img src={bot} alt="" />
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar