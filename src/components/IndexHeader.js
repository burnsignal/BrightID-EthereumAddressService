/*eslint-disable*/
import React, { useState } from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components
import { mobileCheck } from "../util/detectMobile";
import { MobileFlow } from "./mobileFlow";
import { DesktopFlow } from "./desktopFlow";


function IndexHeader() {
  const [isMobile] = useState(mobileCheck())
  return (
    <>
      <div className="page-header clear-filter">
        <Container>
          <div className="content-center brand">
            {
              !isMobile ? <MobileFlow/> : <DesktopFlow/>
            }
          </div>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
