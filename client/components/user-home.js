import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import { PortfolioList, BuyOrSell } from './index';
import Axios from 'axios';

class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      stocks: []
    };
  }

  async componentDidMount() {
    const res = await Axios.get('/api/stocks/');
    this.setState({ stocks: res.data });
  }

  render() {
    const { email, balance } = this.props;
    const { stocks } = this.state;
    console.log(stocks);
    return (
      <div>
        <h2>My Portfolio</h2>
        <h3>Current Balance: ${(balance / 100).toFixed(2)}</h3>
        <PortfolioList stocks={stocks} />
        <BuyOrSell />
      </div>
    );
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    balance: state.user.balance
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string
};
