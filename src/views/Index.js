/*eslint-disable*/
import React, { useState, useEffect } from "react";

// core components
import { MobileFlow } from "../components/mobile";
import { DesktopFlow } from "../components/desktop";

export default function Index({ sponsorAddress, isMobile }) {
  return (
    <>
      {
        isMobile ? <MobileFlow/> : <DesktopFlow sponsorAddress={sponsorAddress} />
      }
    </>
  );
}
