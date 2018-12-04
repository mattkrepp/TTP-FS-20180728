import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

const PortfolioList = props => {
  return (
    <List divided relaxed>
      {props.stocks.map(stock => (
        <List.Item key={stock.id}>
          <List.Content>{stock.symbol}</List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default PortfolioList;
