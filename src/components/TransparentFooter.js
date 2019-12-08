/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()} Bright Ethereum{" "}
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
