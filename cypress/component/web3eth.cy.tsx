import Web3EthComponent from './web3eth';
import { checkLoadTime } from './utils';

describe('web3-eth', () => {
  it('measure load time web3-eth-account package', () => {

    cy.mount(<Web3EthComponent/>);
    
    cy.window().then(() => {

        cy.get('[data-cy="web3-eth-constructor-time"]').as('constructorTime');
        cy.get('[data-cy="web3-eth-getBlock-time"]').as('getBlockTime');
        cy.get('[data-cy="web3-eth-getBalance-time"]').as('getBalanceTime');

        checkLoadTime('@constructorTime', 'Web3 Eth Constructor Time');
        checkLoadTime('@getBlockTime', 'Web3 get block Time');
        checkLoadTime('@getBalanceTime', 'Web3 get balance Time');
    });
  })
});