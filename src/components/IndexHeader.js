/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import Main from "components/main";
// core components
import TransparentFooter from "components/TransparentFooter.js";

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/BrightEthereumBackground.png") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">Bright Ethereum</h1>
            <h4>Choose a method to connect your Ethereum address to <strong>BrightID</strong>, a global, unique identity network:</h4>
            <Main />
          </div>
        </Container>
        <TransparentFooter />
      </div>
    </>
  );
}

export default IndexHeader;
