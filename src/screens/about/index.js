import React from 'react';
import { makeRequest } from 'src/redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const aboutHTML = '<h2>Contact us</h2><br />Shanzhai Limited is a technology company founded in 2015 based in Hong Kong. Working in e-commerce field, we aimed at providing customers satisfying experience in purchasing online. To follow growing trend towards crypto, Shanzhai has made a leap into crypto area by launching a new crypto online exchange named CoinBowl.<br /><br />Coinbowl.com is a new crypto exchange specifically designed for people living in Asia, who have had limited access to crypto markets. CoinBowl enables users to trade large amounts of crypto at great prices. Users can buy or sell an uncapped quantity of crypto with 1 price for 1 order.<br /><br />This movement is expected to continue our run of success in other fields and transform Shanzhai into a diversified investment company. We also have offices in New York, California, Jakarta and Phnom Penh.<br /><br />COMPANY INFO:<br />Name: Shanzhai Limited<br />Mailing Address: Flat A, 18/F, 88 Commercial Building, 28-34 Wing Lok Street, Sheung Wan, Hong Kong<br />';


class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: aboutHTML,
    };
  }

  componentDidMount() {
    const { getAbout } = this.props;
    getAbout({
      type: 'SCREENS/ABOUT',
      url: '/get-about',
      onSuccess: (data) => {
        this.setState(data);
      },
      onError: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <div dangerouslySetInnerHTML={{ __html: this.state.data }} />
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getAbout: bindActionCreators(makeRequest, dispatch),
});

const connectedContactPage = connect(null, mapDispatch)(About);
export default connectedContactPage;