import React, { useState } from "react";
import Header from "../components/header";
import Input from "../components/input";
import BrightEthereumDeepLinkQR from "../components/qrGenerator";

const App: React.FC = () => {
  const [input, updateInput] = useState("");
  const [showQR, toggleShowQR] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInput(e.target.value);
  };

  return (
    <div className="App">
      <Header />
      <Input handleChange={handleChange} />
      <BrightEthereumDeepLinkQR ethAddress={input} showQR={showQR} />
      <button onClick={() => toggleShowQR(!showQR)} disabled={!input}>
        Link BrightID
      </button>
    </div>
  );
};

export default App;
