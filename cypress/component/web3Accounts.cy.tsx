import Web3AccountsComponent from './web3Accounts';
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
    
    cy.window().then((win) => {
      expect(win.web3AccountsLoadTime).to.exist;

    cy.get('[data-cy="web3-eth-accounts-time"]').should(($p) => {
        const loadingTimeText = $p.text();
        expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
        });
    });
    cy.get('[data-cy="web3-create-time"]').should(($p) => {
        const loadingTimeText = $p.text();
        expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
    });
  })
});