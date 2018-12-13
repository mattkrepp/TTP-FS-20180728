import React, { Component } from 'react';
import { Form, Modal, Header, Icon, Button } from 'semantic-ui-react';
import Axios from 'axios';

class BuyOrSell extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'buy',
      symbol: '',
      quantity: '',
      modalOpen: false,
      error: 'Stock Symbol not recognized. Please try again.'
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleToggle(event, { value }) {
    this.setState({ mode: value });
  }

  async handleSubmit(event) {
    const { mode, symbol, quantity } = this.state;
    event.preventDefault();
    try {
      const res = await Axios.post('/api/transactions', {
        mode,
        symbol,
        quantity
      });
      this.props.addStock(res.data);
      this.setState({ symbol: '', quantity: '' });
    } catch (err) {
      this.setState({
        error: err.response.data.message
      });
      this.openModal();
    }
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
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
        <Modal
          trigger={this.state.openModal}
          open={this.state.modalOpen}
          onClose={this.closeModal}
          basic
          size="small"
        >
          <Header icon="exclamation" content="Error processing transaction:" />
          <Modal.Content>
            <h3>{this.state.error}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="teal" onClick={this.closeModal} inverted>
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
      </Form>
    );
  }
}

export default BuyOrSell;
