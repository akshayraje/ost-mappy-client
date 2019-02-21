import React, {Component} from 'react';
var QRCode = require('qrcode.react');

const QRCodeContainer = (props) => (
  <React.Fragment>
    {props.qrSeed && <QRCode value={JSON.stringify(props.qrSeed)}/> }
  </React.Fragment>
);

export default QRCodeContainer;