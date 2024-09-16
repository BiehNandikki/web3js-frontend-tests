import Web3Component from './web3';
import { checkLoadTime } from './utils';

describe('Web3 Component', () => {
  it('measure load time instantiating Web3 package', () => {

    cy.mount(<Web3Component />);
    
    cy.window().then(() => {

      cy.get('[data-cy="web3-create-time"]').as('createTime');
      cy.get('[data-cy="web3-getblock-time"]').as('getBlockTime');
      cy.get('[data-cy="web3-getBalance-time"]').as('getBalanceTime');
      cy.get('[data-cy="web3-getGasprice-time"]').as('getGasPriceTime');
      cy.get('[data-cy="web3-createAccount-time"]').as('createAccountTime');
      cy.get('[data-cy="web3-getChainId-time"]').as('getChainIdTime');
      cy.get('[data-cy="web3-getSignature-time"]').as('getSignatureTime');

      checkLoadTime('@createTime', 'Web3 Create Time');
      checkLoadTime('@getBlockTime', 'Web3 get Block Time');
      checkLoadTime('@getBalanceTime', 'Web3 get Balance Time');
      checkLoadTime('@getGasPriceTime', 'Web3 get Gas Price Time');
      checkLoadTime('@createAccountTime', 'Web3 create Account Time');
      checkLoadTime('@getSignatureTime', 'Web3 get signature Time');
    });
  });
});