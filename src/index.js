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
        if(typeof sponsorAddress != "boolean"){
           this.sponsor = SPONSOR_ADDRESS;
         } else {
           this.sponsor = false;
         }
        break;
      case true:
        this.sponsor = sponsorAddress;
        break;
      default:
        this.sponsor = SPONSOR_ADDRESS;
        break;
    }

    this.isVerified = BrightID.isVerified;
    this.verify = BrightID.verify;
    this.provider = provider;
  }

  static verify() {
    const el = document.createElement("div");
    const { provider, sponsor } = this;
    const isBool = typeof sponsor == "boolean";
    const sponsorAddress =  !isBool ?
      SPONSOR_ADDRESS : sponsor;

    el.id = 'brightid-modal';
    document.body.appendChild(el);

    ReactDOM.render(
        <Index
          sponsorAddress={sponsorAddress}
          provider={provider}
        />,
      document.getElementById(el.id)
    )
  }

  static async isVerified(address){
    if(address.includes('.eth')) {
      address = await convertENS(address)
    } else if(!isAddress(address)) {
      return 'ERROR: INCORRECT ETHEREUM ADDRESS'
    }

    return await isAuthenticated(address)
  }

}
