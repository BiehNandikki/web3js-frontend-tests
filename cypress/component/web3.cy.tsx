import Web3Component from './web3';
describe('Web3 Component', () => {
  it('loading in component', () => {
    cy.mount(<Web3Component />);
  })
})

describe('template spec', () => {
  it('passes', () => {
    
  })
  it('measure load time instantiating Web3 package', () => {

    cy.mount(<Web3Component />);
    
    cy.window().then((win) => {
      expect(win.web3LoadTime).to.exist;

      cy.get('[data-cy="web3-create-time"]').should(($p) => {
        const loadingTimeText = $p.text();
        expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
      }).then(($p) => {
        const loadingTimeText = $p.text();
        cy.log(loadingTimeText);
      });

      cy.get('[data-cy="web3-getblock-time"]').should(($p) => {
        const loadingTimeText = $p.text();
        expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
      }).then(($p) => {
        const loadingTimeText = $p.text();
        cy.task('log', loadingTimeText);
      });

      cy.get('[data-cy="web3-getBalance-time"]').should(($p) => {
        const loadingTimeText = $p.text();
        expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
      }).then(($p) => {
        const loadingTimeText = $p.text();
        console.log(loadingTimeText);
        cy.task('log', loadingTimeText);
      });

      cy.get('[data-cy="web3-getGasprice-time"]').should(($p) => {
        const loadingTimeText = $p.text();
        expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
      }).then(($p) => {
        const loadingTimeText = $p.text();
        cy.task('log', loadingTimeText);
      });
      
      cy.get('[data-cy="web3-createAccount-time"]').should(($p) => {
        const loadingTimeText = $p.text();
        expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
      }).then(($p) => {
        const loadingTimeText = $p.text();
        cy.task('log', loadingTimeText);
      });
    });
  })

  // it('measure web3-eth-accounts package', () => {

  // }) 
});