import { checkLoadTime } from "./utils";
import EthersComponent from './ethers';

describe(`Ethers Component`, () => {
    it('measure load time of the Ethers package', () => {
        cy.mount(<EthersComponent />);
        cy.window().then(() => {
            cy.get('[data-cy="ethers-createProvider-time"]').as('getCreateTime');
            cy.get('[data-cy="ethers-getBlock-time"]').as('getBlockTime');
            cy.get('[data-cy="ethers-getBalance-time"]').as('getBalanceTime');
            

            checkLoadTime('@getCreateTime', 'Ethers create client Time');
            checkLoadTime('@getBlockTime', 'Ethers create get Block Time');
            checkLoadTime('@getBalanceTime', 'Ethers create get Balance Time');

        });
    });
});