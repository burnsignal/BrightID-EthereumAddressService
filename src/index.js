import React from "react";
import ReactDOM from "react-dom";

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/bright-ethereum.scss";
import "./assets/css/demo.css";
import "./assets/css/nucleo-icons-page-styles.css";

import { isAuthenticated } from './util/brightID'
import { convertENS } from './util/ens'

// pages for this kit
import Modal from "./components/modal";
import Index from "./views";

export function verify() {
  const el = document.createElement("div");
  el.id = 'brightid-modal';

  document.body.appendChild(el);

  ReactDOM.render(
    <Modal active> <Index /> </Modal>,
    document.getElementById(el.id)
  )
}

export const isVerified = async(address) => {
  if(address.includes('.eth')) {
    address = await convertENS(address)
  } else if(address.length != 42){
    return 'ERROR: INCORRECT ETHEREUM ADDRESS'
  }

  return await isAuthenticated(address)
}

verify()
