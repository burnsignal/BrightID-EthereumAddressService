import React from "react";
import ReactDOM from "react-dom";

import "./assets/css/root.css";

import { SPONSOR_ADDRESS } from './assets/constants/parameters'
import { isAddress } from './assets/constants/functions'
import { isAuthenticated } from './util/brightID'
import { convertENS } from './util/ens'

import Index from "./views";

export default class BrightID {
  constructor(sponsorAddress, provider) {
    switch (isAddress(sponsorAddress)){
      case false:
        if(typeof sponsorAddress !== 'bool'){
           this.sponsor = SPONSOR_ADDRESS;
         } else {
           this.sponsor = false;
         }
        break;
      case true:
        this.sponsor = sponsorAddress;
        break;
    }

    this.isVerified = BrightID.isVerified
    this.verify = BrightID.verify
    this.provider = provider
  }

  static verify() {
    const el = document.createElement("div");
    const { provider, sponsor } = this;

    el.id = 'brightid-modal';
    document.body.appendChild(el);

    ReactDOM.render(
        <Index
          provider={provider}
          sponsorAddress={sponsor}
        />,
      document.getElementById(el.id)
    )
  }

  static async isVerified(address){
    if(address.includes('.eth')) {
      address = await convertENS(address)
    } else if(address.length != 42){
      return 'ERROR: INCORRECT ETHEREUM ADDRESS'
    }

    return await isAuthenticated(address)
  }

}
