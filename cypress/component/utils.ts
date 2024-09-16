
export const checkLoadTime = (alias: string, label: string) => {
    cy.get(alias).should('not.contain', 'Loading...')
    .should(($p) => {
      const loadingTimeText = $p.text();
      expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
    })
    .then(($p) => {
      const loadingTimeText = $p.text();
      cy.task('log',`${label}: ${loadingTimeText}`);
    })

  }