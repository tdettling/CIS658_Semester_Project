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



describe("Requestor Homepage Search Routing", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");
  

      cy.get('[data-cy=requestor_search]').type("Jane Doe");
      cy.get('[data-cy=requestor_submit]').click();
  
      cy.url().should("include", "/ISDs?requestor=Jane%20Doe");
      cy.contains("Jane Doe").should("exist");
    });
  });



  describe("Requestor ISD Search Page Search Routing", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");
  
      cy.visit("http://localhost:3000/ISDs");

      cy.get('[data-cy=requestor_search]').type("Jane Doe");
      cy.get('[data-cy=requestor_submit]').click();
  
      cy.url().should("include", "/ISDs?requestor=Jane%20Doe");
      cy.contains("Jane Doe").should("exist");
    });
  });



  describe("Requestor ISD Search Page Search Routing Bad Input", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.window().then((win) => {
        cy.stub(win, "alert").as("alertStub");
      });
  
      cy.visit("http://localhost:3000/ISDs");
      
      cy.get('[data-cy=requestor_search]').type("wronguser");
      cy.get('[data-cy=requestor_submit]').click();
  
      cy.get("@alertStub").should("have.been.calledWith", "Requestor not found in ISD list.");
    });
  });


  describe("ISD Homepage Search Routing", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with isd query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");
  

      cy.get('[data-cy=isd_search]').type(10001014);
      cy.get('[data-cy=isd_submit]').click();
      cy.url().should("include", "/ISDs/10001014");
      cy.contains(10001014).should("exist");
    });
  });


  describe("ISD Homepage Search Routing Bad Input", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with isd query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.window().then((win) => {
        cy.stub(win, "alert").as("alertStub");
      });
  

      cy.get('[data-cy=isd_search]').type(10001014);
      cy.get('[data-cy=isd_submit]').click();
      
      cy.get("@alertStub").should("have.been.calledWith", "ISD not found in ISD list.");
    });
  });



  describe("ISD View ISD Page Search Routing", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with isd query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/ISDs");
  

      cy.get('[data-cy=isd_search]').type(10001014);
      cy.get('[data-cy=isd_submit]').click();
      cy.url().should("include", "/ISDs/10001014");
      cy.contains(10001014).should("exist");
    });
  });


  describe("PO Homepage Search Routing", () => {
    it("logs in and navigates to /Home, then navigates to /Inventory with po query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");
  

      cy.get('[data-cy=po_search]').type(1014705);
      cy.get('[data-cy=po_submit]').click();
  
      cy.url().should("include", "/inventory/edit/");
      cy.get('input[name="po"]').should('have.value', '1014705');

    });
  });



  describe("PO Homepage Search Routing Bad Input", () => {
    it("logs in and navigates to /Home, then navigates to /Inventory with po query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");
  
      cy.window().then((win) => {
        cy.stub(win, "alert").as("alertStub");
      });


      cy.get('[data-cy=po_search]').type(1014705);
      cy.get('[data-cy=po_submit]').click();
  
      cy.get("@alertStub").should("have.been.calledWith", "PO not found.");

    });
  });



  describe("PO Inventory Page Search Routing", () => {
    it("logs in and navigates to /Home, then navigates to /Inventory with po query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/inventory");
  

      cy.get('[data-cy=po_search]').type(1014705);
      cy.get('[data-cy=po_submit]').click();
  
      cy.url().should("include", "/inventory/edit/");
      cy.get('input[name="po"]').should('have.value', '1014705');

    });
  });
  