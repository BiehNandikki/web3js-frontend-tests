
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

export const logging = (cy: Cypress.cy, title: string, averages: Record<string, number[]>, totalIterations: number) => {
  cy.task('log', `${title} Component ${totalIterations} iterations`);
    Object.keys(averages).forEach((key) => {
      const total = averages[key].reduce((acc, cur) => acc + cur, 0);
      const average = total / totalIterations;
      const data = `${key} - Average load time: ${average.toFixed(2)}ms`;
      cy.task('log', data);
      cy.task('logToTxt', { filename: title+'_test_results.txt', data: data })
    });
};