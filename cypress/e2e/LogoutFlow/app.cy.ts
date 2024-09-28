describe('Logout Functionality', () => {

  beforeEach(() => {
    cy.viewport('macbook-13');
    Cypress.Cookies.debug(true);
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('name@randomemail.com');
    cy.wait(200);
    cy.get('[data-cy="password-input"]').type('randomepassword');
    cy.wait(200);
    cy.get('[data-cy="login-button"]').click();
    cy.wait(200);
    cy.url().should('include', '/products');
  });

  it('should be able to logout', () => {
    cy.get('[data-cy="user-profile-button"]').click();
    cy.wait(200);
    cy.getCookie('login')
      .should('exist')
      .then(cookie => {
        expect(cookie).to.have.property('httpOnly', true);
        expect(cookie).to.have.property('value');
      });

    cy.get('a[href="/logout"]').click();
    cy.wait(200);

    // should be redirected to login page
    cy.url().should('contain','/login');
    cy.getCookie('login').should('not.exist');
  });

});

