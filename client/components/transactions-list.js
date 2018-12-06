import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import Axios from 'axios';

class TransactionsList extends Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
  }
  async componentDidMount() {
    let { data } = await Axios.get('/api/transactions');
    data = data.sort((a, b) => b.createdAt < a.createdAt);
    this.setState({ transactions: data });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Transactions:</h2>
        <List divided relaxed>
          {this.state.transactions.map(transaction => {
            const rawDate = new Date(transaction.createdAt);
            const year = rawDate.getFullYear();
            const month = rawDate.getMonth();
            const day = rawDate.getDate();
            const hours = rawDate.getHours();
            let minutes = rawDate.getMinutes();
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            const readableDate = `${month}/${day}/${year}     ${hours}:${minutes} UTC`;
            return (
              <List.Item key={transaction.id}>
                <List.Header>Date: {readableDate}</List.Header>
                <List.Description>
                  Symbol: {transaction.symbol}
                </List.Description>
                <List.Description>
                  Quantity: {transaction.quantity}
                </List.Description>
                <List.Description>
                  Price Paid: {(transaction.purchasePrice / 100).toFixed(2)}
                </List.Description>
              </List.Item>
            );
          })}
        </List>
      </React.Fragment>
    );
  }
}

export default TransactionsList;
