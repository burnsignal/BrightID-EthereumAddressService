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

  return <QRCode value={deepLink} size={200} />
};

export default BrightEthereumDeepLinkQR;
