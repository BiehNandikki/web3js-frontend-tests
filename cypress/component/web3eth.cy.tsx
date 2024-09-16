import Web3EthComponent from './web3eth';
describe('Web3 Component', () => {
  it('loading in component', () => {
    cy.mount(<Web3EthComponent/>);
  })
})

describe('template spec', () => {
  it('passes', () => {
    
  })
  it('measure load time web3-eth-account package', () => {

    cy.mount(<Web3EthComponent/>);
    
    cy.window().then((win) => {
    //   expect(win.web3AccountsLoadTime).to.exist;

    cy.get('[data-cy="web3-eth-constructor-time"]').should(($p) => {
        const loadingTimeText = $p.text();
        expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
        });
    });
  })
});