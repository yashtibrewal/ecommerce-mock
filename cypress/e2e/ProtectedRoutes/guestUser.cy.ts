describe('Should not be able to navigate to protected lists if logged out', () => {

  beforeEach('delete any cookies to keep the session logged out', () => {
    Cypress.Cookies.debug(true);
    // cy.clearCookies();
    // Get cookies and log them to the console
    cy.getCookies().then((cookies) => {
      console.log('Cookies:', cookies);
    });
  })

  it('should not be able to visit cart page', () => {
    cy.visit('/products/cart');
    cy.wait(200);
    cy.url().should('include', '/login');
  });

  it('should not be able to visit wishlist page', () => {
    cy.visit('/products/wishlist');
    cy.wait(200);
    cy.url().should('include', '/login');

  });

  it('should not be able to visit contact page', () => {
    cy.visit('/contact');
    cy.wait(200);
    cy.url().should('include', '/login');

  });
});