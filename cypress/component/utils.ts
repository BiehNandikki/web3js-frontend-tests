
export const checkLoadTime = (alias: string, label: string) => {
    const time = cy.get(alias).should('not.contain', 'Loading...')
    .should(($p) => {
      const loadingTimeText = $p.text();
      expect(loadingTimeText).to.match(/\d+(\.\d+)?ms/);
    })
    .then(($p) => {
      const loadingTimeText = $p.text();
      // cy.task('log',`${label}: ${loadingTimeText}`);
      const texts =  loadingTimeText.split(" ")
      const time = parseFloat(texts[texts.length-1].replace(/[^0-9.]/g, ''));
      // cy.task('log', `${label}: ${time}ms`);
      return time;
    })
    return time;
  }