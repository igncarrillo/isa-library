import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('BorrowedBook e2e test', () => {
  const borrowedBookPageUrl = '/borrowed-book';
  const borrowedBookPageUrlPattern = new RegExp('/borrowed-book(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const borrowedBookSample = {};

  let borrowedBook: any;
  //let book: any;
  //let client: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/books',
      body: {"isbn":"supply-chains","name":"Rubber intermediate Silver","publishYear":"SMS neural override","copies":93959,"cover":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","coverContentType":"unknown"},
    }).then(({ body }) => {
      book = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/clients',
      body: {"firstName":"Deja","lastName":"Dickinson","email":"Meagan.Kirlin55@yahoo.com","address":"Pine Loan","phone":"(343) 783-7263"},
    }).then(({ body }) => {
      client = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/borrowed-books+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/borrowed-books').as('postEntityRequest');
    cy.intercept('DELETE', '/api/borrowed-books/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/books', {
      statusCode: 200,
      body: [book],
    });

    cy.intercept('GET', '/api/clients', {
      statusCode: 200,
      body: [client],
    });

  });
   */

  afterEach(() => {
    if (borrowedBook) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/borrowed-books/${borrowedBook.id}`,
      }).then(() => {
        borrowedBook = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (book) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/books/${book.id}`,
      }).then(() => {
        book = undefined;
      });
    }
    if (client) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/clients/${client.id}`,
      }).then(() => {
        client = undefined;
      });
    }
  });
   */

  it('BorrowedBooks menu should load BorrowedBooks page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('borrowed-book');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BorrowedBook').should('exist');
    cy.url().should('match', borrowedBookPageUrlPattern);
  });

  describe('BorrowedBook page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(borrowedBookPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BorrowedBook page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/borrowed-book/new$'));
        cy.getEntityCreateUpdateHeading('BorrowedBook');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', borrowedBookPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/borrowed-books',
          body: {
            ...borrowedBookSample,
            book: book,
            client: client,
          },
        }).then(({ body }) => {
          borrowedBook = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/borrowed-books+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/borrowed-books?page=0&size=20>; rel="last",<http://localhost/api/borrowed-books?page=0&size=20>; rel="first"',
              },
              body: [borrowedBook],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(borrowedBookPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(borrowedBookPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response!.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details BorrowedBook page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('borrowedBook');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', borrowedBookPageUrlPattern);
      });

      it('edit button click should load edit BorrowedBook page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BorrowedBook');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', borrowedBookPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of BorrowedBook', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('borrowedBook').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', borrowedBookPageUrlPattern);

        borrowedBook = undefined;
      });
    });
  });

  describe('new BorrowedBook page', () => {
    beforeEach(() => {
      cy.visit(`${borrowedBookPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BorrowedBook');
    });

    it.skip('should create an instance of BorrowedBook', () => {
      cy.get(`[data-cy="borrowDate"]`).type('2022-03-05').should('have.value', '2022-03-05');

      cy.get(`[data-cy="book"]`).select(1);
      cy.get(`[data-cy="client"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        borrowedBook = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', borrowedBookPageUrlPattern);
    });
  });
});
