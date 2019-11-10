import React from "react";
const QRCode = require("qrcode.react");

interface BrightEthereumDeepLinkQRProps {
  ethAddress: string;
}

const deepLinkPrefix =
  "brightid://link-verification/http:%2f%2fnode.brightid.org/BrightEthereum/";

const BrightEthereumDeepLinkQR = ({
  ethAddress,
}: BrightEthereumDeepLinkQRProps) => {
  const deepLink = deepLinkPrefix + ethAddress;
  return (
    <div>
      <div>
        <p>Scan the QR code to connect your Ethereum address with your BrightID account</p>
        <QRCode value={deepLink} />
      </div>
    </div>);
};

export default BrightEthereumDeepLinkQR;
