import React, { useEffect } from 'react';
import jazzicon from 'jazzicon';

export default function Blockie({ address }) {

  useEffect(() => {
    let element = document.getElementById('blockie')
    let parsed =  parseInt(address.slice(2, 10), 16)
    let blockie = jazzicon(100, parsed)

    blockie.style.borderRadius = '250px'
    blockie.style.border = '6px solid #e78a64'

    element.appendChild(blockie)
  }, [])

  return(
    <div className="blockie-container">
      <a target='_blank' href={`https://etherscan.io/address/${address}`}>
        <div id="blockie" />
      </a>
    </div>
  )
}
