import Web3AccountsComponent from './web3Accounts';
import { checkLoadTime } from './utils';
describe('Web3 Component', () => {
  it('loading in component', () => {
    cy.mount(<Web3AccountsComponent/>);
  })
})

describe('template spec', () => {
  it('passes', () => {
    
  })
  it('measure load time web3-eth-account package', () => {

    cy.mount(<Web3AccountsComponent/>);
    
    cy.window().then(() => {

    cy.get('[data-cy="web3-eth-accounts-create-time"]').as('createTime');
    cy.get('[data-cy="web3-eth-accounts-sign-time"]').as('signTime');
    
    checkLoadTime('@createTime', 'Web3 Eth Accounts Create Time');
    checkLoadTime('@signTime', 'Web3 Eth Accounts Sign Time');
    });
  })
});