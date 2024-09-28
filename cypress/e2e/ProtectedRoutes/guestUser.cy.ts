import { WAIT_TIME_AFTER_CLICK } from ".."; // Importing a constant that defines wait time after clicks

/**
 * Test suite for verifying navigation restrictions to protected pages when the user is logged out.
 */
describe('Should not be able to navigate to protected lists if logged out', () => {

  beforeEach('delete any cookies to keep the session logged out', () => {
    // Enable cookie debugging for development purposes
    Cypress.Cookies.debug(true);

    // Uncomment to clear cookies before each test, ensuring a logged-out state
    // cy.clearCookies(); 

    // Log current cookies to the console for debugging
    cy.getCookies().then((cookies) => {
      console.log('Cookies:', cookies);
    });
  });

  /**
   * Test to ensure that the cart page cannot be accessed when logged out.
   */
  it('should not be able to visit cart page', () => {
    cy.visit('/products/cart'); // Attempt to visit the cart page
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for any potential redirects
    cy.url().should('include', '/login'); // Assert that the URL includes '/login'
  });

  /**
   * Test to ensure that the wishlist page cannot be accessed when logged out.
   */
  it('should not be able to visit wishlist page', () => {
    cy.visit('/products/wishlist'); // Attempt to visit the wishlist page
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for any potential redirects
    cy.url().should('include', '/login'); // Assert that the URL includes '/login'
  });

  /**
   * Test to ensure that the contact page cannot be accessed when logged out.
   */
  it('should not be able to visit contact page', () => {
    cy.visit('/contact'); // Attempt to visit the contact page
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for any potential redirects
    cy.url().should('include', '/login'); // Assert that the URL includes '/login'
  });
});
