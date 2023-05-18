import {
  accountMenuSelector,
  adminMenuSelector,
  loginItemSelector,
  navbarSelector,
  passwordLoginSelector,
  submitLoginSelector,
  submitSettingsSelector,
  usernameLoginSelector,
} from '../../support/commands';
import { entityDetailsButtonSelector } from '../../support/entity';

describe('My own tests', () => {
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
  });

  describe('with admin login', () => {
    it('should view admin tab when login as admin', () => {
      cy.clickOnLoginItem();
      cy.get(usernameLoginSelector).click().type('admin');
      cy.get(passwordLoginSelector).type('admin');
      cy.get(submitLoginSelector).click();
      cy.get(adminMenuSelector).should('be.visible');
    });
  });

  describe('with session user credentials', () => {
    beforeEach(() => {
      cy.login('user', 'user');
      cy.visit('');
    });
    it('view button click should show Author attributes', () => {
      cy.clickOnEntityMenuItem('author');
      cy.getEntityHeading('Author').should('exist');
      cy.url().should('match', new RegExp('/author(\\?.*)?$'));
      cy.get(entityDetailsButtonSelector).first().click();
      cy.getEntityDetailsHeading('author');
    });

    it('view settings and logout', () => {
      cy.clickOnSettingsItem();
      cy.url().should('include', '/account/settings');
      cy.get(submitSettingsSelector).should('be.visible');
      cy.clickOnLogoutItem();
      cy.get(navbarSelector).get(accountMenuSelector).click().get(loginItemSelector).should('be.visible');
    });
  });
});
