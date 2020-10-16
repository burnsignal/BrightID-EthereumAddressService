/*eslint-disable*/
import React, { useState, useEffect } from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components
import { mobileCheck } from "../util/detectMobile";
import { MobileFlow } from "../components/mobileFlow";
import { DesktopFlow } from "../components/desktopFlow";


function Index({ sponsorAddress }) {
  const [isMobile] = useState(mobileCheck())

  useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    }
  })

  return (
    <>
      <div className="page-header clear-filter">
        <Container>
          <div className="content-center brand">
            {
              isMobile ? <MobileFlow/> : <DesktopFlow sponsorAddress={sponsorAddress} />
            }
          </div>
        </Container>
      </div>
    </>
  );
}

export default Index;
