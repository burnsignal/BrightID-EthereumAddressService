/*eslint-disable*/
import React, { useState } from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components
import { mobileCheck } from "../util/detectMobile";
import { MobileFlow } from "../components/mobileFlow";
import { DesktopFlow } from "../components/desktopFlow";

function Index() {
  const [isMobile] = useState(mobileCheck())
  return (
    <>
      <div className="page-header clear-filter">
        <Container>
          <div className="content-center brand">
            {
              isMobile ? <MobileFlow/> : <DesktopFlow/>
            }
          </div>
        </Container>
      </div>
    </>
  );
}

export default Index;
