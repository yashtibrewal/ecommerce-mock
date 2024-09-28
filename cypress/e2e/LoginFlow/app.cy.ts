describe('Login Link Navigation via different viewports', () => {

  it('should navigate to the login page on laptop', () => {
    // Visit the homepage or the page where the login link is present

    cy.viewport('macbook-11') // Set viewport to laptop
    cy.visit('/'); // Replace with your actual homepage route if different

    // Find the login link and click on it
    cy.get('a[href="/login"]').click();
    cy.wait(200);

    // Wait for the page to load and check if the URL is correct
    cy.url().should('include', '/login');

    // Optionally, you can check for specific elements on the login page to confirm it's loaded
    cy.get('h1').should('contain', 'Login'); // Replace with a relevant selector and text for your login page
  });

  it('should navigate to the login page on tablet', () => {
    // Visit the homepage or the page where the login link is present

    cy.viewport('ipad-2') // Set viewport to mobile
    cy.visit('/'); // Replace with your actual homepage route if different

    cy.get('[data-cy="hamburger-icon"]').click();
    cy.wait(200);

    // Find the login link and click on it
    cy.get('a[href="/login"]').click();
    cy.wait(200);

    // Wait for the page to load and check if the URL is correct
    cy.url().should('include', '/login');

    // Optionally, you can check for specific elements on the login page to confirm it's loaded
    cy.get('h1').should('contain', 'Login'); // Replace with a relevant selector and text for your login page
  });

  it('should navigate to the login page on phone', () => {
    // Visit the homepage or the page where the login link is present

    cy.viewport('iphone-8') // Set viewport to 375px x 667px
    cy.visit('/'); // Replace with your actual homepage route if different

    cy.get('[data-cy="hamburger-icon"]').click();
    cy.wait(200);

    // Find the login link and click on it
    cy.get('a[href="/login"]').click();
    cy.wait(200);

    // Wait for the page to load and check if the URL is correct
    cy.url().should('include', '/login');

    // Optionally, you can check for specific elements on the login page to confirm it's loaded
    cy.get('h1').should('contain', 'Login'); // Replace with a relevant selector and text for your login page
  });
});


describe('Login Page functionalities', () => {

  beforeEach(() => {
    cy.viewport('macbook-13');
    Cypress.Cookies.debug(true);
    cy.visit('/login');
  });

  it('should login and go to products page', () => {
    cy.get('[data-cy="email-input"]').type('name@randomemail.com');
    cy.wait(200);
    cy.get('[data-cy="password-input"]').type('randomepassword');
    cy.wait(200);
    cy.get('[data-cy="login-button"]').click();
    cy.wait(200);
    cy.url().should('include', '/products');
    cy.getCookies()
      .then(cookies => console.log(cookies));
    cy.getCookie('login')
      .should('exist')
      .then(cookie => {
        expect(cookie).to.have.property('httpOnly', true);
      });
  });

  it('should allow user to go to products page without logging in', () => {

    cy.get('[data-cy="skip-link"]').click();
    cy.wait(200);

    cy.url().should('include', '/products');

  });

});