/*eslint-disable*/
import React, { useState } from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components
import TransparentFooter from "components/TransparentFooter.js";

import { mobileCheck } from "util/detectMobile";
import { MobileFlow } from "./mobileFlow";
import { DesktopFlow } from "./desktopFlow";


function IndexHeader() {
  const [isMobile] = useState(mobileCheck())
  return (
    <>
      <div className="page-header clear-filter">
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">Bright Ethereum</h1>
            <h4>Link your Ethereum address to <strong>BrightID</strong>, a global, unique identity network:</h4>
            {
              isMobile ? <MobileFlow/> : <DesktopFlow/>
            }
          </div>
        </Container>
        <TransparentFooter />
      </div>
    </>
  );
}

export default IndexHeader;
