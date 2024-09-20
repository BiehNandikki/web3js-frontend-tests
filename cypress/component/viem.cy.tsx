import { checkLoadTime } from "./utils";
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
        getSignatureTime: [],
    };


    for (let i = 0; i < totalIterations; i++) {
        it('measure load time of the Viem package', () => {
            cy.mount(<ViemComponent/>);
            cy.window().then(() => {
                cy.get('[data-cy="viem-createClient-time"]').as('createClientTime');
                // cy.get('[data-cy="viem-getBlock-time"]').as('getBlockTime');
                // cy.get('[data-cy="viem-getBalance-time"]').as('getBalanceTime');
                // cy.get('[data-cy="viem-getChainId-time"]').as('getChainId');
                cy.get('[data-cy="viem-sign-time"]').as('getSignatureTime');
                cy.get('[data-cy="viem-createWalletClient-time"]').as('createWallet');
                

                checkLoadTime('@createClientTime', 'Viem create client Time').then((time) => averages['createClientTime'].push(time));
                // checkLoadTime('@getBlockTime', 'Viem block Time').then((time) => averages['createTime'].push(time));
                // checkLoadTime('@getBalanceTime', 'Viem get balance Time').then((time) => averages['createTime'].push(time));
                // checkLoadTime('@getChainId', 'Viem get chainID Time').then((time) => averages['createTime'].push(time));
                checkLoadTime('@createWallet', 'Viem create wallet Time').then((time) => averages['createWallet'].push(time));
                checkLoadTime('@getSignatureTime', 'Viem create wallet Time').then((time) => averages['getSignatureTime'].push(time));
            });
            
        });
    };

    after(() => {
        cy.task('log', `Viem Component ${totalIterations} iterations`);
        Object.keys(averages).forEach((key) => {
          const total = averages[key].reduce((acc, cur) => acc + cur, 0);
          const average = total / totalIterations;
          cy.task('log', `${key} - Average load time: ${average.toFixed(2)}ms`);
        });
      });
});