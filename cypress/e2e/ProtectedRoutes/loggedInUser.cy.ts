describe('Logged-In Functionality', () => {

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

  it('should allow access to wishlist page', () => {
    cy.visit('/products/wishlist');
    cy.wait(200);
    cy.url().should('include', '/wishlist');
  });

  it('should allow access to cart page', () => {
    cy.visit('/products/cart');
    cy.wait(200);
    cy.url().should('include', '/cart');
  });
  
  it('should allow access to contact page', () => {
    cy.visit('/contact');
    cy.wait(200);
    cy.url().should('include', '/contact');
    // Add more assertions related to protected-page-2 here
  });
});
