import React from "react";
const QRCode = require("qrcode.react");

interface BrightEthereumDeepLinkQRProps {
  ethAddress: string;
}

const deepLinkPrefix =
  "brightid://link-verification/http:%2f%2fnode.brightid.org/ethereum/";

const BrightEthereumDeepLinkQR = ({
  ethAddress,
}: BrightEthereumDeepLinkQRProps) => {
  const deepLink = deepLinkPrefix + ethAddress;
  return (
    <div>
      <QRCode value={deepLink} size={192} />
    </div>);
};

export default BrightEthereumDeepLinkQR;
