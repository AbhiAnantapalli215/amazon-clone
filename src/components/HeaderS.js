import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

function HeaderS() {
  return (
    <div className='header'>
        <div className="secondary-navbar">
        <div className="header-menu"><MenuIcon />
        <a href="/" ><p className="content">All</p></a></div>
        <p className="content">MX Player</p>
        <p className="content">Home Improvement</p>
        <p className="content">Toys & Games</p>
        <p className="content">Customer Service</p>
        <p className="content">Mobiles</p>
        <p className="content">New Releases</p>
        <a href="/electronics"><p className="content">Electronics</p></a>
        <img class="adv"src="https://m.media-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/March2025/Gladiator2/400x39-SWM_Final_NP._CB549298932_.jpg" alt="ss"></img>
      </div>
    </div>
  )
}

export default HeaderS