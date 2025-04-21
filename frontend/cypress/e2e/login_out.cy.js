/*
L Dettling
CIS 658

Sources: 
https://www.youtube.com/watch?v=6BkcHAEWeTU
https://www.youtube.com/watch?v=ygkkN4Bxm38
https://www.youtube.com/watch?v=5_kzBziuXjg
https://docs.cypress.io/app/guides/cypress-studio
https://docs.cypress.io/app/guides/conditional-testing
https://docs.cypress.io/app/end-to-end-testing/testing-your-app
*/







describe('Login flow', () => {
    it('should redirect to dashboard with valid credentials', () => {
      cy.visit("http://localhost:3000/");
  
      cy.get("input[name=username]").type("test");
      cy.get("input[name=password]").type("test");
      cy.get("button[type=submit]").click();
  
      cy.url().should("include", "/Home");
    });
  });
  


  describe('Login flow', () => {
    it('should redirect to dashboard with valid credentials', () => {
      cy.visit("http://localhost:3000/");
  
      cy.get("input[name=username]").type("xx");
      cy.get("input[name=password]").type("xx");
      cy.get("button[type=submit]").click();
  
      cy.url().should("include", "/");
    });
  });


  describe('No Username/Password', () => {
    it('shows a validation error when fields are empty', () => {
      cy.visit("http://localhost:3000");
  
      cy.get("button[type=submit]").click();
  
      cy.contains("Username and password are required").should("be.visible");
    });
  });


  
  describe('Invalid Username/Password', () => {
      it('shows an error from the server on bad login', () => {
        cy.visit("http://localhost:3000");
      
        cy.get("input[name=username]").type("wronguser");
        cy.get("input[name=password]").type("wrongpass");
        cy.get("button[type=submit]").click();
      
        cy.contains("Incorrect username or password").should("be.visible");
      });
      
  });
  