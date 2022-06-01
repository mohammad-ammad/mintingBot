import React from 'react'

const Navbar = () => {
  return (
    <>
    <div class="main">
    <nav class="navbar  navbar-expand-lg navbar-dark bg-transparent" style={{fontFamily: "Luckiest Guy, cursive"}}>
        <a class="navbar-brand" href="#" style={{paddingLeft: "150px", fontSize: "40px" }}>Cryptoo</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav" style={{marginLeft: "35%", fontSize:"20px"}}>
            <a class="nav-item nav-link active" href="#" id="navicon">Home</a>
            <a class="nav-item nav-link" href="#" id="navicon">Connected</a>
          </div>
        </div>
      </nav>
        <div class="lefttext">
            <div class="textwrap">
                <h1>
                    Minting Bot
                </h1>
                <p>
                    
This bot is useful to mint NFT among so many people in public sale. Every NFT has their own active mint function or start mint block number or start mint timestamp
                </p>
                <button>Connect Wallet</button>
            </div>
            

        </div>
        <div class="rightimage">
            <img src="https://lh3.googleusercontent.com/lCHsWnDxHw9Osijae-wcdqIImOYRuonlNjOov84t0xjenD-mLfbeXfspUDLCUzho-lnMJPoEKvYQweS6Qtq4LHQKj3OuDntV8ejueqQ=w600" />
        </div>
    </div>
    </>
  )
}

export default Navbar