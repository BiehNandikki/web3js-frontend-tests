import { checkLoadTime, logging } from "./utils";
import EthersComponent from './ethers';

describe(`Ethers Component`, () => {
    let hasTestFailed = false;
    const totalIterations = 5;
    const averages: Record<string, number[]> = {
        createProvider: [],
        createAccountTime: [],
        signMessageTime: [],
        signTransactionTime: [],
    };

    for (let i = 0; i < totalIterations; i++) {
        it('measure load time of the Ethers package', () => {
            cy.mount(<EthersComponent />);
            cy.window().then(() => {
                cy.get('[data-cy="ethers-createProvider-time"]').as('createProvider');
                cy.get('[data-cy="ethers-getWallet-time"]').as('getWalletTime');
                cy.get('[data-cy="ethers-sign-time"]').as('getSignMessageTime');
                cy.get('[data-cy="ethers-signTransaction-time"]').as('getSignTransactionTime');
                
                checkLoadTime('@createProvider', 'Ethers create client Time').then((time) => averages['createProvider'].push(time));
                checkLoadTime('@getWalletTime', 'Ethers create get wallet Time').then((time) => averages['createAccountTime'].push(time));
                checkLoadTime('@getSignMessageTime', 'Ethers create get sign message Time').then((time) => averages['signMessageTime'].push(time));
                checkLoadTime('@getSignTransactionTime', 'Ethers create get sign transaction Time').then((time) => averages['signTransactionTime'].push(time));
            });
        });
    };

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