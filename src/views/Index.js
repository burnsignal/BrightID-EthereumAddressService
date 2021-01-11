/*eslint-disable*/
import React, { useState, useEffect } from "react";

// core components
import { mobileCheck } from "../util/detectMobile";
import { MobileFlow } from "../components/mobile";
import { DesktopFlow } from "../components/desktop";

export default function Index({ sponsorAddress }) {
  const [isMobile] = useState(mobileCheck())

  return (
    <>
      {
        isMobile ? <MobileFlow/> : <DesktopFlow sponsorAddress={sponsorAddress} />
      }
    </>
  );
}
