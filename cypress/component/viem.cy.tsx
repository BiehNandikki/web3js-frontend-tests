import { checkLoadTime, logging } from "./utils";
import ViemComponent from './viem';

describe('Viem Component', () => {
    let hasTestFailed = false;
    const totalIterations = 5;
    const averages: Record<string, number[]> = {
        createClientTime: [],
        signMessageTime: [],
        signTransactionTime: []
    };


    for (let i = 0; i < totalIterations; i++) {
        it('measure load time of the Viem package', () => {
            cy.mount(<ViemComponent/>);
            cy.window().then(() => {
                cy.get('[data-cy="viem-createClient-time"]', { timeout: 10000}).as('createClientTime');
                cy.get('[data-cy="viem-sign-time"]').as('getSignatureMessageTime');
                cy.get('[data-cy="viem-signTransaction-time"]').as('getSignTransactionTime');
                
                checkLoadTime('@createClientTime', 'Viem create client Time').then((time) => averages['createClientTime'].push(time));
                checkLoadTime('@getSignatureMessageTime', 'Viem sign message Time').then((time) => averages['signMessageTime'].push(time));
                checkLoadTime('@getSignTransactionTime', 'Viem sign transaction Time').then((time) => averages['signTransactionTime'].push(time));
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