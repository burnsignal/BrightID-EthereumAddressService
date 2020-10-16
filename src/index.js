import React from "react";
import ReactDOM from "react-dom";

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/bright-ethereum.scss";
import "./assets/css/demo.css";
import "./assets/css/nucleo-icons-page-styles.css";

import { SPONSOR_ADDRESS } from './assets/constants/parameters'
import { isAddress } from './assets/constants/functions'
import { isAuthenticated } from './util/brightID'
import { convertENS } from './util/ens'

// pages for this kit
import Modal from "./components/modal";
import Index from "./views";

export default class BrightID {
  constructor(sponsor, sponsorAddress) {
    switch (sponsor){
      case true:
        if(!isAddress(sponsorAddress){
          this.sponsor = SPONSOR_ADDRESS
        } else {
          this.sponsor = sponsorAddress
        }
      case false:
        this.sponsor = false
      default:
        this.sponsor = SPONSOR_ADDRESS
    }

    this.isVerified = BrightID.isVerified
    this.verify = BrightID.verify
  }

  static verify() {
    const el = document.createElement("div");
    el.id = 'brightid-modal';

    document.body.appendChild(el);

    ReactDOM.render(
      <Modal active> <Index /> </Modal>,
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
