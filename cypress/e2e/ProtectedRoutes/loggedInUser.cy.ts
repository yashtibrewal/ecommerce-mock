import { WAIT_TIME_AFTER_CLICK } from ".."; // Importing a constant that defines wait time after clicks

/**
 * Test suite for validating functionality available to logged-in users.
 */
describe('Logged-In Functionality', () => {

  beforeEach(() => {
    // Set up the viewport and perform login before each test
    cy.viewport('macbook-13'); // Set viewport to MacBook size
    cy.visit('/login'); // Navigate to the login page

    // Input email and password, then submit the login form
    cy.get('[data-cy="email-input"]').type('name@randomemail.com');
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.get('[data-cy="password-input"]').type('randomepassword');
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.get('[data-cy="login-button"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK);

    // Validate successful login by checking the URL and cookie existence
    cy.url().should('include', '/products'); // Assert the URL includes '/products'
    cy.getCookies().then(cookies => console.log(cookies)); // Log cookies for debugging
    cy.getCookie('login')
      .should('exist') // Ensure the login cookie is present
      .then(cookie => {
        expect(cookie).to.have.property('httpOnly', true); // Validate the cookie's httpOnly attribute
      });
  });

  /**
   * Test to verify that logged-in users can access the wishlist page.
   */
  it('should allow access to wishlist page', () => {
    cy.visit('/products/wishlist'); // Navigate to the wishlist page
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.url().should('include', '/wishlist'); // Assert that the URL includes '/wishlist'
  });

  /**
   * Test to verify that logged-in users can access the cart page.
   */
  it('should allow access to cart page', () => {
    cy.visit('/products/cart'); // Navigate to the cart page
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.url().should('include', '/cart'); // Assert that the URL includes '/cart'
  });

  /**
   * Test to verify that logged-in users can access the contact page.
   */
  it('should allow access to contact page', () => {
    cy.visit('/contact'); // Navigate to the contact page
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.url().should('include', '/contact'); // Assert that the URL includes '/contact'
    // Additional assertions related to the contact page can be added here if needed
  });
});
