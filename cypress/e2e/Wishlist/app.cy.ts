

describe('Wishlist functionalities', () => {

  beforeEach(() => {
    cy.viewport('macbook-13');

    // Perform login before all tests
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('name@randomemail.com');
    cy.wait(200);
    cy.get('[data-cy="password-input"]').type('randomepassword');
    cy.wait(200);
    cy.get('[data-cy="login-button"]').click();
    cy.wait(200);

    // Check if login was successful
    cy.url().should('include', '/products');
    cy.getCookies()
      .then(cookies => console.log(cookies));
    cy.getCookie('login')
      .should('exist')
      .then(cookie => {
        expect(cookie).to.have.property('httpOnly', true);
      });
  });

  /**
   * This is a sample functionality test to check wishlist to contain the product which has been added before.
   */
  it('should add to wishlist', () => {

    let productTitle: string | null = '';

    cy.visit('/products');
    cy.wait(200);
    cy.get('[data-cy="product-card"]').eq(0).within(() => {
      cy.get('[data-cy="add-to-wishlist-button"]').click();
      cy.get('[data-cy="product-title"]').then(
        (htmlNodes) => {
          if (htmlNodes && htmlNodes.length > 0) {
            productTitle = htmlNodes[0].textContent;
          }
        });
    })
    cy.wait(200);
    cy.get('[data-cy="product-card"]').eq(0).within(() => {
      cy.get('[data-cy="remove-from-wishlist-button"]').should('be.visible');
    });

    cy.visit("/products/wishlist");
    cy.wait(200);

    cy.get('[data-cy="wishlist-product"]').eq(0).within(() => {
      cy.get('[data-cy="title"]').then((htmlNodes) => {
        expect(htmlNodes[0].textContent).to.eq(productTitle);
      });
    })
  });

});

/**
 * Future Scope:
 * 1. Should be able to remove from wishlist
 * 2. Should be able to move to cart.
 */