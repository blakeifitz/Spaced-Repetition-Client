import * as helpers from './helpers';

Cypress.Commands.add('login', (options = {}) => {
  cy.visit('/not-found-page-to-login')
    .window()
    .then((win) => {
      win.sessionStorage.setItem(
        Cypress.env('TOKEN_KEY'),
        helpers.makeLoginToken()
      );
    });
});
