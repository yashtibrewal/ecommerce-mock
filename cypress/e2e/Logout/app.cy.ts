import { WAIT_TIME_AFTER_CLICK } from ".."; // Importing a constant that defines wait time after clicks

/**
 * Test suite for verifying logout functionality in the application.
 */
describe('Logout Functionality', () => {

  beforeEach(() => {
    // Set up the viewport and visit the login page before each test
    cy.viewport('macbook-13'); // Set viewport for testing
    Cypress.Cookies.debug(true); // Enable cookie debugging
    cy.visit('/login'); // Navigate to the login page
    
    // Input email and password to log in
    cy.get('[data-cy="email-input"]').type('name@randomemail.com');
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for input to register
    cy.get('[data-cy="password-input"]').type('randomepassword');
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for input to register
    cy.get('[data-cy="login-button"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for the login request to complete
    
    // Validate that the URL is correct after logging in
    cy.url().should('include', '/products');
  });

  /**
   * Test to verify that a logged-in user can successfully log out.
   */
  it('should be able to logout', () => {
    // Click the user profile button to access logout option
    cy.get('[data-cy="user-profile-button"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for the dropdown to open

    // Verify that the login cookie exists and has the correct properties
    cy.getCookie('login')
      .should('exist')
      .then(cookie => {
        expect(cookie).to.have.property('httpOnly', true); // Validate cookie's httpOnly property
        expect(cookie).to.have.property('value'); // Ensure the cookie has a value
      });

    // Click the logout link to log out
    cy.get('a[href="/logout"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for the logout process to complete

    // Validate that the user is redirected to the login page
    cy.url().should('contain', '/login');
    cy.getCookie('login').should('not.exist'); // Ensure the login cookie no longer exists
  });

});
