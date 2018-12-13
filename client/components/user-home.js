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
      stocks: [],
      balance: 0
    };
    this.addStock = this.addStock.bind(this);
  }

  async componentDidMount() {
    const res = await Axios.get('/api/stocks/');
    const keys = Object.keys(res.data);
    let stocksArr = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      stocksArr.push({ ...res.data[key], symbol: key });
    }
    this.setState({ stocks: stocksArr, balance: this.props.balance });
  }

  addStock(newStock) {
    let stockIdx = -1;
    for (let i = 0; i < this.state.stocks.length; i++) {
      let currStock = this.state.stocks[i];
      if (currStock.symbol === newStock.symbol) {
        stockIdx = i;
        break;
      }
    }

    if (stockIdx === -1) {
      let newArr = [...this.state.stocks, newStock];
      this.setState({ stocks: newArr });
    }

    const chargeAmount = newStock.price * newStock.quantity;
    const newBalance = this.props.balance - chargeAmount;

    if (newBalance > 0) {
      this.setState({ balance: newBalance });
    }
  }
  render() {
    const { balance, stocks } = this.state;
    return (
      <div>
        <h2>My Portfolio</h2>
        <h3>Current Balance: ${(balance / 100).toFixed(2)}</h3>
        <PortfolioList stocks={stocks} />
        <BuyOrSell addStock={this.addStock} />
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

// UserHome.propTypes = {
//   email: PropTypes.string
// };
