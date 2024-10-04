import Web3Component from './web3';
import { checkLoadTime, logging } from './utils';

describe('Web3 Component', () => {
  let hasTestFailed = false;
  const totalIterations = 5;
  const averages: Record<string, number[]> = {
    createProvider: [],
    createWalletTime: [],
    signMessageTime: [],
    signTransactionTime: [],
  };

  for (let i = 0; i < totalIterations; i++) {
    it(`Measure load time - Iteration ${i + 1}`, () => {
      cy.mount(<Web3Component />);
      
      cy.window().then(() => {
        cy.get('[data-cy="web3-create-time"]').as('createTime');
        cy.get('[data-cy="web3-createAccount-time"]').as('createAccountTime');
        cy.get('[data-cy="web3-getSignature-time"]').as('getSignatureTime',);
        cy.get('[data-cy="web3-getSignedTransaction-time"]').as('getSignTransactionTime');

        checkLoadTime('@createTime', 'Web3 Create Time').then((time) => averages['createProvider'].push(time));
        checkLoadTime('@createAccountTime', 'Web3 create Account Time').then((time) => averages['createWalletTime'].push(time));
        checkLoadTime('@getSignatureTime', 'Web3 get Signature Time').then((time) => averages['signMessageTime'].push(time));
        checkLoadTime('@getSignTransactionTime', 'Web3 get Signature Transaction Time').then((time) => averages['signTransactionTime'].push(time));
      });
    });
  }

  afterEach(function() {
    if (this.currentTest && this.currentTest.state === 'failed') {
      hasTestFailed = true; // Mark that a test has failed
    }
  });

  after(() => {
    // Only log if no tests failed
    if (!hasTestFailed) {
      logging(cy, 'web3', averages, totalIterations);
    } else {
      console.log('Tests failed, skipping logging.');
    }
  });
});
