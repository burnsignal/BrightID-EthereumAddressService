/*eslint-disable*/
import React, { useState, useEffect } from "react";

// core components
import { mobileCheck } from "../util/detectMobile";
import { MobileFlow } from "../components/mobileFlow";
import { DesktopFlow } from "../components/desktopFlow";

function Index({ sponsorAddress }) {
  const [isMobile] = useState(mobileCheck()

  return (
    <>
      {
        isMobile ? <MobileFlow/> : <DesktopFlow sponsorAddress={sponsorAddress} />
      }
    </>
  );
}

export default Index;
