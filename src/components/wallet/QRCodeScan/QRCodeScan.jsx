import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {Field, clearFields, change} from "redux-form";
import {connect} from "react-redux";

import Button from 'src/components/core/controls/Button';

import Modal from 'src/components/core/controls/Modal';

// import QrReader from 'react-qr-reader';

import { hideScanQRCode } from 'src/screens/app/redux/action';

import './QRCodeScan.scss';

import BrowserDetect from 'src/services/browser-detect';

class QRCodeScan extends React.Component {

  static propTypes = {
    app: PropTypes.object,
    onFinish: PropTypes.func,
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      delay: 300,
      data: '',
      legacyMode: false,
      onFinish: null,
      isLoaded: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    let props = nextProps.app.scanQRCodeData || {};
    if (props.isShow){
       this.openQrcode(props);
    }
  }

  componentDidMount() {
    let legacyMode = (BrowserDetect.isChrome && BrowserDetect.isIphone); // show choose file or take photo
    this.setState({legacyMode: legacyMode});
  }


  onFinish = (data) => {
    try {
      // reset input select file
      // this.refs.qrReaderScan.els.input.value = '';
    } catch(e) {
      console.warn(e);
    }

    const { onFinish } = this.state;

    if (onFinish) {
      onFinish(data);
      this.modalScanQrCodeMainRef.close();
    }
    else{

    }


  }

// For Qrcode:
handleScan=(data) =>{
  if(data){
    this.onFinish(data);
  }
}

handleError(err) {
  console.log('error scan qrcode: ', err);
}

oncloseQrCode=() => {
  this.setState({ isShow: false, onFinish: null, isLoaded: false }, () => {
    this.props.hideScanQRCode();
  });

}

openQrcode = (props) => {
  if (!this.state.legacyMode){
    this.setState({ isShow: true, onFinish: props.onFinish });
    this.modalScanQrCodeMainRef.open();
  }
  else{
    this.setState({ onFinish: props.onFinish });
    this.openImageDialog();
  }
}
openImageDialog = () => {
  // this.refs.qrReaderScan.openImageDialog();
}

render() {

  const { messages } = this.props.intl;
  const { isLoaded } = this.state;

  {/* QR code dialog */}
  return (
        <Modal onClose={() => this.oncloseQrCode()} title={messages['wallet.action.transfer.label.scan_qrcode']} onRef={modal => this.modalScanQrCodeMainRef = modal} modalBodyStyle={{"padding": 0}} >
            {!isLoaded && <div style={{ textAlign: 'center', marginTop: '10px' }}>{messages['wallet.action.transfer.label.init_scanner']}</div>}
            {/* {this.state.isShow || this.state.legacyMode ?
              <QrReader
                ref="qrReaderScan"
                delay={this.state.delay}
                onScan={(data) => { this.handleScan(data); }}
                onError={this.handleError}
                style={{ width: '100%', height: '100%' }}
                legacyMode={this.state.legacyMode}
                showViewFinder={false}
                onLoad={() => this.setState({isLoaded: true})}
              />
              : ''} */}
        </Modal>
    )
  }
}

const mapState = state => ({
  app: state.app,
});

const mapDispatch = ({
  hideScanQRCode,
});

export default injectIntl(connect(mapState, mapDispatch)(QRCodeScan));
