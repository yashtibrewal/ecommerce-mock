import { WAIT_TIME_AFTER_CLICK } from ".."; // Importing a constant that defines wait time after clicks

describe('Login Link Navigation via different viewports', () => {

  /**
   * Test for navigating to the login page on a laptop viewport.
   */
  it('should navigate to the login page on laptop', () => {
    // Set viewport to laptop and visit the homepage
    cy.viewport('macbook-11');
    cy.visit('/');

    // Click the login link and validate navigation
    cy.get('a[href="/login"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login');
  });

  /**
   * Test for navigating to the login page on a tablet viewport.
   */
  it('should navigate to the login page on tablet', () => {
    // Set viewport to tablet and visit the homepage
    cy.viewport('ipad-2');
    cy.visit('/');

    // Click the hamburger menu to reveal login options
    cy.get('[data-cy="hamburger-icon"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK);

    // Click the login link and validate navigation
    cy.get('a[href="/login"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login');
  });

  /**
   * Test for navigating to the login page on a phone viewport.
   */
  it('should navigate to the login page on phone', () => {
    // Set viewport to phone and visit the homepage
    cy.viewport('iphone-8');
    cy.visit('/');

    // Click the hamburger menu to reveal login options
    cy.get('[data-cy="hamburger-icon"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK);

    // Click the login link and validate navigation
    cy.get('a[href="/login"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login');
  });
});

describe('Login Page functionalities', () => {

  beforeEach(() => {
    cy.viewport('macbook-13'); // Set viewport for each test
    Cypress.Cookies.debug(true); // Enable debug for cookies
    cy.visit('/login'); // Visit the login page before each test
  });

  /**
   * Test for successful login and navigation to the products page.
   */
  it('should login and go to products page', () => {
    // Input credentials and submit the login form
    cy.get('[data-cy="email-input"]').type('name@randomemail.com');
    cy.get('[data-cy="password-input"]').type('randomepassword');
    cy.get('[data-cy="login-button"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK);

    // Validate successful navigation to products page
    cy.url().should('include', '/products');

    // Debugging: log cookies to console
    cy.getCookies()
      .then(cookies => console.log(cookies));

    // Assert the existence and properties of the login cookie
    cy.getCookie('login')
      .should('exist')
      .then(cookie => {
        expect(cookie).to.have.property('httpOnly', true);
      });
  });

  /**
   * Test for accessing the products page without logging in.
   */
  it('should allow user to go to products page without logging in', () => {
    // Click the skip link to bypass login
    cy.get('[data-cy="skip-link"]').click();
    cy.wait(WAIT_TIME_AFTER_CLICK);

    // Validate successful navigation to products page
    cy.url().should('include', '/products');
  });
});
