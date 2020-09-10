import React from "react";

// core components
import IndexNavbar from "../components/IndexNavbar.js";
import IndexHeader from "../components/IndexHeader.js";

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
      <div
          className="bg-image"
          style={{
            backgroundImage: "url(" + require("../assets/img/BrightEthereumBackground.png") + ")"
          }}
        ></div>
      <IndexNavbar />
      <IndexHeader />
    </>
  );
}

export default Index;
