import React, { CSSProperties } from "react";

const Header = () => {
  const style: CSSProperties = { textAlign: "center" };

  return (
    <header className="App-header" style={style}>
      <p>Header</p>
      <hr />
    </header>
  );
};

export default Header;
