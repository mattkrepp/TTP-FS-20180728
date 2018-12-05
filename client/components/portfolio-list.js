import React, { Component } from 'react';
import { List, Statistic } from 'semantic-ui-react';

const PortfolioList = props => {
  return (
    <List divided relaxed>
      {props.stocks.map(stock => {
        const priceDiff = stock.price - stock.dayOpen;
        let color;
        if (priceDiff > 0) color = 'green';
        else if (priceDiff < 0) color = 'red';
        else color = 'gray';

        return (
          <List.Item key={stock.symbol}>
            <List.Content>
              <h2>{stock.symbol}</h2>
              <Statistic size="tiny">
                <Statistic.Value>
                  {(stock.price / 100).toFixed(2)}
                </Statistic.Value>
                <Statistic.Label>Price</Statistic.Label>
              </Statistic>
              <Statistic size="tiny">
                <Statistic.Value>
                  {(stock.dayOpen / 100).toFixed(2)}
                </Statistic.Value>
                <Statistic.Label>Open</Statistic.Label>
              </Statistic>
              <Statistic size="tiny" color={color}>
                <Statistic.Value>
                  {(
                    (stock.price - stock.dayOpen) /
                    stock.dayOpen *
                    100
                  ).toFixed(2)}%
                </Statistic.Value>
                <Statistic.Label>Change</Statistic.Label>
              </Statistic>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default PortfolioList;
