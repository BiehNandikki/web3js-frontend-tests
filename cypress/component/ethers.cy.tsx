import { checkLoadTime, logging } from "./utils";
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
        getSignMessageTime: [],
        getSignTransactionTime: [],
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
                cy.get('[data-cy="ethers-sign-time"]').as('getSignMessageTime');
                cy.get('[data-cy="ethers-signTransaction-time"]').as('getSignTransactionTime');
                
                
                checkLoadTime('@createProvider', 'Ethers create client Time').then((time) => averages['createProvider'].push(time));
                // checkLoadTime('@getBlockTime', 'Ethers create get Block Time').then((time) => averages['getBlockTime'].push(time));
                // checkLoadTime('@getBalanceTime', 'Ethers create get Balance Time').then((time) => averages['getBalanceTime'].push(time));
                // checkLoadTime('@getChainIdTime', 'Ethers create client Time').then((time) => averages['getChainIdTime'].push(time));
                checkLoadTime('@getWalletTime', 'Ethers create get wallet Time').then((time) => averages['getWalletTime'].push(time));
                checkLoadTime('@getSignMessageTime', 'Ethers create get sign message Time').then((time) => averages['getSignMessageTime'].push(time));
                checkLoadTime('@getSignTransactionTime', 'Ethers create get sign transaction Time').then((time) => averages['getSignTransactionTime'].push(time));
                
            });
        });
    };

    after(() => {
        logging(cy, 'ethers', averages, totalIterations);
      });
});