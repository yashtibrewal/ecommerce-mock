import { WAIT_TIME_AFTER_CLICK } from ".."; // Importing a constant that defines wait time after clicks

/**
 * Test suite for validating wishlist functionalities within the application.
 */
describe('Wishlist functionalities', () => {

  beforeEach(() => {
    // Set up the viewport and perform login before each test to ensure user authentication
    cy.viewport('macbook-13'); // Set viewport to MacBook size
    cy.visit('/login'); // Navigate to the login page
    cy.get('[data-cy="email-input"]').type('name@randomemail.com'); // Enter email
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.get('[data-cy="password-input"]').type('randomepassword'); // Enter password
    cy.wait(WAIT_TIME_AFTER_CLICK);
    cy.get('[data-cy="login-button"]').click(); // Click the login button
    cy.wait(WAIT_TIME_AFTER_CLICK);

    // Validate successful login by checking the URL and cookie existence
    cy.url().should('include', '/products'); // Assert the URL indicates a successful login
    cy.getCookies().then(cookies => console.log(cookies)); // Log cookies for debugging
    cy.getCookie('login')
      .should('exist') // Ensure the login cookie is present
      .then(cookie => {
        expect(cookie).to.have.property('httpOnly', true); // Validate the cookie's httpOnly attribute
      });
  });

  /**
   * This test verifies that a product can be added to the wishlist 
   * and subsequently checks if the wishlist reflects the addition.
   */
  it('should add to wishlist', () => {
    let productTitle: string | null = ''; // Variable to store the title of the product added to wishlist

    // Navigate to the products page
    cy.visit('/products'); 
    cy.wait(WAIT_TIME_AFTER_CLICK);

    // Locate the first product card and click the 'add to wishlist' button
    cy.get('[data-cy="product-card"]').eq(0).within(() => {
      cy.get('[data-cy="add-to-wishlist-button"]').click(); // Click to add the product to wishlist

      // Retrieve the product title for later verification
      cy.get('[data-cy="product-title"]').then(htmlNodes => {
        if (htmlNodes && htmlNodes.length > 0) {
          productTitle = htmlNodes[0].textContent; // Store the product title
        }
      });
    });

    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for UI updates

    // Verify that the 'remove from wishlist' button is visible
    cy.get('[data-cy="product-card"]').eq(0).within(() => {
      cy.get('[data-cy="remove-from-wishlist-button"]').should('be.visible');
    });

    // Navigate to the wishlist page to confirm the product is listed
    cy.visit("/products/wishlist");
    cy.wait(WAIT_TIME_AFTER_CLICK); // Wait for any potential page loads

    // Verify that the wishlist contains the correct product
    cy.get('[data-cy="wishlist-product"]').eq(0).within(() => {
      cy.get('[data-cy="title"]').then(htmlNodes => {
        expect(htmlNodes[0].textContent).to.eq(productTitle); // Assert that the title matches
      });
    });
  });
});

/**
 * Future Scope:
 * 1. Should be able to remove from wishlist
 * 2. Should be able to move items to cart.
 */
