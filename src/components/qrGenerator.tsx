import React from "react";
import { DEEPLINK } from "../assets/constants/parameters";
const QRCode = require("qrcode.react");

interface BrightEthereumDeepLinkQRProps {
  ethAddress: string;
}

const BrightEthereumDeepLinkQR = ({
  ethAddress,
}: BrightEthereumDeepLinkQRProps) => {
  const deepLink = DEEPLINK + ethAddress;

  return <QRCode value={deepLink} size={200} />
};

export default BrightEthereumDeepLinkQR;
