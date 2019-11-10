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

  const resetState = () => {
    updateInput("");
    toggleShowQR(false);
  }

  return (
    <div className="App">
      <Header />
      {
        !showQR && <Input handleChange={handleChange} />
      }
      {
        showQR && <BrightEthereumDeepLinkQR ethAddress={input} />
      }
      {
        !showQR &&
        <button onClick={() => toggleShowQR(!showQR)} disabled={!input}>
          Link BrightID
        </button>
      }
      {
        showQR &&
        <button onClick={resetState}>
          Back
        </button>
      }
    </div>
  );
};

export default App;
