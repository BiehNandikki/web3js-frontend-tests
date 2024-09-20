import { checkLoadTime } from "./utils";
import ViemComponent from './viem';

describe('Viem Component', () => {
    it('measure load time of the Viem package', () => {
        cy.mount(<ViemComponent/>);
        cy.window().then(() => {
            cy.get('[data-cy="viem-createClient-time"]').as('getCreateTime');
            cy.get('[data-cy="viem-getBlock-time"]').as('getBlockTime');
            cy.get('[data-cy="viem-getBalance-time"]').as('getBalanceTime');
            cy.get('[data-cy="viem-getChainId-time"]').as('getChainId');
            cy.get('[data-cy="viem-createWalletClient-time"]').as('createWallet');
            

            checkLoadTime('@getCreateTime', 'Viem create client Time');
            checkLoadTime('@getBlockTime', 'Viem block Time');
            checkLoadTime('@getBalanceTime', 'Viem get balance Time');
            checkLoadTime('@getChainId', 'Viem get chainID Time');
            checkLoadTime('@createWallet', 'Viem create wallet Time');
        });
    });
});