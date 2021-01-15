/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// core components
import { MobileFlow } from "../components/mobile";
import { DesktopFlow } from "../components/desktop";
import Modal from "../components/modal";

import { mobileCheck } from "../util/detectMobile";

const getTheme = () => createMuiTheme({
  palette: {
    text: {
      primary: 'black',
    },
    primary: {
      main: '#e78a64',
    },
    secondary: {
      main: '#666666',
    },
  }
});

export default function Index({ sponsorAddress }) {
  const isMobile = mobileCheck();

  return (
    <ThemeProvider>
      <Modal active isMobile={isMobile}>
        {
          isMobile ? <MobileFlow/> : <DesktopFlow sponsorAddress={sponsorAddress} />
        }
      </Modal>
    </ThemeProvider>
  );
}
