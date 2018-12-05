import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col }from 'react-bootstrap';
import { LabelLang, FieldLang, WrapperLang } from 'src/lang/components';
import { Button, InputField } from 'src/components/custom';
import style from './style.scss';

// eslint-disable-next-line
class BankInfoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: props.initialValues.bankName ? false : true
    };
  }
  toggleEdit = () => this.setState({ isEditMode: true });
  
  switchViewMode = () => this.setState({ isEditMode: false });

  render() {
    // eslint-disable-next-line
    const { handleSubmit, onSubmit, onDelete } = this.props;
    const { isEditMode } = this.state;
    return (
      <form className={style.container}>
        <Row className={style.row}>
          <Col md={8}><label className={style.title}><LabelLang id="me.bankInfo.title" /></label></Col>
          {!isEditMode && (
          <Col md={4} className={style.rowBtns}>
            <button type="button" className={style.btnUpdate} onClick={this.toggleEdit}><LabelLang id="app.common.update" /></button>
            <button type="button" className={style.btnDelete} onClick={onDelete}><LabelLang id="app.common.delete" /></button>
          </Col>)}
        </Row>
        <div className={style.lineTitle} />
        <br />
        <Row className={style.row}>
          <Col md={6}><LabelLang id="me.bankInfo.bankName" /></Col>
          <Col md={6}><FieldLang name="bankName" component={InputField} disabled={!isEditMode} placeholder="me.bankInfo.bankNameHolder" /></Col>
        </Row>
        <Row className={style.row}>
          <Col md={6}><LabelLang id="me.bankInfo.bankAccountName" /></Col>
          <Col md={6}><FieldLang name="bankAccountName" disabled={!isEditMode} component={InputField} placeholder="me.bankInfo.bankAccountNameHolder" /></Col>
        </Row>
        <Row className={style.row}>
          <Col md={6}><LabelLang id="me.bankInfo.bankAccountNumber" /></Col>
          <Col md={6}><FieldLang name="bankAccountNumber" disabled={!isEditMode} component={InputField} placeholder="me.bankInfo.bankAccountNumberHolder" /></Col>
        </Row>
        
        {isEditMode && (
        <Row style={{ padding: '5px', marginTop: '10px' }}>
          <Col md={9} />
          <Col md={3}>
            <WrapperLang>
              {ts => <Button onClick={handleSubmit(onSubmit)} value={ts('app.common.save')} />}
            </WrapperLang>
          </Col>
        </Row>)}
      </form>
    );
  }
}

const mapState = state => ({
  initialValues: {
    bankName: state.auth.profile.payment_info?.bankName || '',
    bankAccountName: state.auth.profile.payment_info?.bankAccountName || '',
    bankAccountNumber: state.auth.profile.payment_info?.bankAccountNumber || '',
  }
});


export default compose(
  connect(mapState, null, null, { withRef: true }),
  reduxForm({
    form: 'BankInfoForm',
    enableReinitialize: true,
  },  { withRef: true }),
)(BankInfoForm);