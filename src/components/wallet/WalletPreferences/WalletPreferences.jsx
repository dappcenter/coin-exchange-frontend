import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WalletPreferences.scss';
import Switch from 'src/components/core/controls/Switch';
import InputMobile from '../InputMobile';
import Modal from 'src/components/core/controls/Modal';
import {injectIntl} from 'react-intl';
import { ENGINE_METHOD_DIGESTS } from 'constants';

class WalletPreferences extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false
    this.state = {
      walletNameContent: "",
      walletName: this.props.wallet.title,
      isHideBalance: this.props.wallet.hideBalance,            
    };
    this.messages = this.props.intl.messages;
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true;  
  }  

  onHideBalanceChange = (isChecked) => {
    if (!this._isMounted) return;
    this.props.wallet.hideBalance = isChecked;
    this.props.onUpdateWalletName(this.props.wallet);
  }


  handleWalletNameChange=(evt) => {
    if (!this._isMounted) return;
    let value = evt.target.value;
    this.setState({walletName: value}, ()=>{
      this.renderModalName();
    });
  }

  handleUpdateNameOnClick = () => {
    if (!this._isMounted) return;
    if (this.state.walletName){
      this.props.wallet.title = this.state.walletName;
      this.props.onUpdateWalletName(this.props.wallet);
      this.modalWalletNameRef.close();
    }
        
  }

  renderModalName=()=>{
    const disabled = !this.state.walletName ? "disabled" : "";
    this.setState({walletNameContent: (
        <div className="update-name">
          <label>{this.messages['wallet.action.preferecens.update_name.label']}</label>
          <InputMobile required placeholder={this.messages['wallet.action.preferecens.update_name.title']} maxLength="40" value={this.state.walletName} onChange={(evt) => {this.handleWalletNameChange(evt)}} />
          <button type="button" onClick={this.handleUpdateNameOnClick} disabled={!this.state.walletName} className="button wallet-new-button btn-block">{this.messages['wallet.action.preferecens.update_name.button.save']}</button>
        </div>
      )
    }, ()=>{
      this.modalWalletNameRef.open();
    });
  }

  onOpenModalName=()=>{    
    if (!this._isMounted) return;
    this.setState({walletName : this.props.wallet.title}, ()=>{
      this.renderModalName();
    });
  }  

  render() {
    const { onItemClick, wallet } = this.props;
    

    return (
      <div>
        <Modal onClose={()=>{this.setState({walletNameContent: ""})}} title="Wallet Name" onRef={modal => this.modalWalletNameRef = modal}>
          {this.state.walletNameContent}
        </Modal>
          <div className="box-setting">
              <div className="item item-has-click" onClick={this.onOpenModalName}>
                  <div className="name">
                      <label>{this.messages['wallet.action.preferecens.list_item.wallet_name']}</label>
                  </div>
                  <div className="value">
                      <span className="text">{wallet.title}</span>
                  </div>
              </div>

              <div className="item">
                  <div className="name">
                      <label>{this.messages['wallet.action.preferecens.list_item.hide_balance']}</label>
                  </div>
                  <div className="value">
                    <Switch isChecked={this.props.wallet.hideBalance} onChange={(isChecked)=> {this.onHideBalanceChange(isChecked)}} />
                  </div>
              </div>

              <div className="item item-has-click" onClick={this.props.onWarningClick}>
                  <div className="name">
                      <label>{this.messages['wallet.action.preferecens.list_item.backup_wallet']}</label>
                  </div>
                  <div className="value">

                  </div>
              </div>

              <div className="item item-has-click" onClick={this.props.onExportPrivateKeyClick}>
                  <div className="name">
                      <label>{this.messages['wallet.action.preferecens.list_item.export_private_key']}</label>
                  </div>
                  <div className="value">

                  </div>
              </div>


              <div className="item item-has-click" onClick={this.props.onDeleteWalletClick}>
                  <div className="name">
                      <label className="text-danger">{this.messages['wallet.action.preferecens.list_item.delete_wallet']}</label>
                  </div>
                  <div className="value">

                  </div>
              </div>
          </div>                
        </div>
    );
  }
}

WalletPreferences.propTypes = {
  onWarningClick: PropTypes.func,
  onDeleteWalletClick: PropTypes.func,
};

const mapDispatch = ({  
  
});


export default injectIntl(connect(null, mapDispatch)(WalletPreferences));
