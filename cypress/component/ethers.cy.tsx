import { checkLoadTime } from "./utils";
import EthersComponent from './ethers';

describe(`Ethers Component`, () => {
    const labels = [
        'createProvider',
        // 'getBlockTime',
        // 'getBalanceTime',
        'createAccountTime',
        // 'getChainIdTime',
        'getSignTime',
      ];

    const totalIterations = 5;
    const averages: Record<string, number[]> = {
        createProvider: [],
        // getBlockTime: [],
        // getBalanceTime: [],
        // createAccountTime: [],
        getWalletTime: [],
        getSignTime: [],
    };

    for (let i = 0; i < totalIterations; i++) {
        it('measure load time of the Ethers package', () => {
            cy.mount(<EthersComponent />);
            cy.window().then(() => {
                cy.get('[data-cy="ethers-createProvider-time"]').as('createProvider');
                // cy.get('[data-cy="ethers-getBlock-time"]').as('getBlockTime');
                // cy.get('[data-cy="ethers-getBalance-time"]').as('getBalanceTime');
                // cy.get('[data-cy="ethers-getChain-time"]').as('getChainIdTime');
                cy.get('[data-cy="ethers-getWallet-time"]').as('getWalletTime');
                cy.get('[data-cy="ethers-sign-time"]').as('getSignTime');
                
                
                checkLoadTime('@createProvider', 'Ethers create client Time').then((time) => averages['createProvider'].push(time));
                // checkLoadTime('@getBlockTime', 'Ethers create get Block Time').then((time) => averages['getBlockTime'].push(time));
                // checkLoadTime('@getBalanceTime', 'Ethers create get Balance Time').then((time) => averages['getBalanceTime'].push(time));
                // checkLoadTime('@getChainIdTime', 'Ethers create client Time').then((time) => averages['getChainIdTime'].push(time));
                checkLoadTime('@getWalletTime', 'Ethers create get wallet Time').then((time) => averages['getWalletTime'].push(time));
                checkLoadTime('@getSignTime', 'Ethers create get sign Time').then((time) => averages['getSignTime'].push(time));

            });
        });
    };

    after(() => {
        // Calculate averages and log them after all iterations are done
        cy.task('log', `Ethers Component ${totalIterations} iterations`);
        Object.keys(averages).forEach((key) => {
          const total = averages[key].reduce((acc, cur) => acc + cur, 0);
          const average = total / totalIterations;
          cy.task('log', `${key} - Average load time: ${average.toFixed(2)}ms`);
        });
      });
});