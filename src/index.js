/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bright-ethereum-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/bright-ethereum-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/bright-ethereum.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Modal from "./components/modal.js";
import Index from "./views/Index.js";

export function connect() {
  const el = document.createElement("div");
  el.id = 'brightid-modal';

  document.body.appendChild(el);

  ReactDOM.render(
    <Modal active> <Index /> </Modal>,
    document.getElementById(el.id)
  )
}

connect()
