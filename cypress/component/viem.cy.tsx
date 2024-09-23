import { checkLoadTime, logging } from "./utils";
import ViemComponent from './viem';

describe('Viem Component', () => {

    const totalIterations = 5;
    const averages: Record<string, number[]> = {
        createClientTime: [],
        // getBlockTime: [],
        // getBalanceTime: [],
        // getGasPriceTime: [],
        createWallet: [],
        // getChainIdTime: [],
        getSignatureMessageTime: [],
        getSignTransactionTime: []
    };


    for (let i = 0; i < totalIterations; i++) {
        it('measure load time of the Viem package', () => {
            cy.mount(<ViemComponent/>);
            cy.window().then(() => {
                cy.get('[data-cy="viem-createClient-time"]', { timeout: 10000}).as('createClientTime');
                // cy.get('[data-cy="viem-getBlock-time"]').as('getBlockTime');
                // cy.get('[data-cy="viem-getBalance-time"]').as('getBalanceTime');
                // cy.get('[data-cy="viem-getChainId-time"]').as('getChainId');
                cy.get('[data-cy="viem-sign-time"]').as('getSignatureMessageTime');
                // cy.get('[data-cy="viem-createWalletClient-time"]', { timeout: 10000}).should('exist').as('createWallet');
                cy.get('[data-cy="viem-signTransaction-time"]').as('getSignTransactionTime');
                

                checkLoadTime('@createClientTime', 'Viem create client Time').then((time) => averages['createClientTime'].push(time));
                // checkLoadTime('@getBlockTime', 'Viem block Time').then((time) => averages['createTime'].push(time));
                // checkLoadTime('@getBalanceTime', 'Viem get balance Time').then((time) => averages['createTime'].push(time));
                // checkLoadTime('@getChainId', 'Viem get chainID Time').then((time) => averages['createTime'].push(time));
                // checkLoadTime('@createWallet', 'Viem create wallet Time').then((time) => averages['createWallet'].push(time));
                checkLoadTime('@getSignatureMessageTime', 'Viem sign message Time').then((time) => averages['getSignatureMessageTime'].push(time));
                checkLoadTime('@getSignTransactionTime', 'Viem sign transaction Time').then((time) => averages['getSignTransactionTime'].push(time));
            });
            
        });
    };

    after(() => {
        logging(cy, 'viem', averages, totalIterations);
      });
});