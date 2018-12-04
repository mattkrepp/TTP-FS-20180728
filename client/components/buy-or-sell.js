import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import Axios from 'axios';

class BuyOrSell extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'buy'
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleToggle(event, { value }) {
    console.log(value);
    this.setState({ mode: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await Axios.post('/api/transaction');
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log('this.state', this.state);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Radio
            label="Buy"
            value="buy"
            checked={this.state.mode === 'buy'}
            onChange={this.handleToggle}
          />
          <Form.Radio
            label="Sell"
            value="sell"
            checked={this.state.mode === 'sell'}
            onChange={this.handleToggle}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            name="symbol"
            fluid
            label="Stock Symbol"
            placeholder="AAPL"
            onChange={this.handleInput}
          />
          <Form.Input
            name="quantity"
            fluid
            label="Quantity"
            placeholder="3"
            onChange={this.handleInput}
          />
        </Form.Group>
        <Form.Button color="teal">
          {this.state.mode === 'buy' ? 'Buy' : 'Sell'}
        </Form.Button>
      </Form>
    );
  }
}

export default BuyOrSell;
