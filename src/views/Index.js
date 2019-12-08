import React from "react";

// core components
import IndexNavbar from "components/IndexNavbar.js";
import IndexHeader from "components/IndexHeader.js";
import TransparentFooter from "components/TransparentFooter.js";

function Index() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="page-header">
        <IndexHeader />
        <div className="main">
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default Index;
