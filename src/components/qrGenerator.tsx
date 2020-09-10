import React from "react";
import { deepLinkPrefix } from "../util/deepLink";
const QRCode = require("qrcode.react");

interface BrightEthereumDeepLinkQRProps {
  ethAddress: string;
}

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
