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

/*
*******************************************************************************************************
CREATE
*******************************************************************************************************
*/


describe("Create New Stock item", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/inventory");
      cy.get('button[name=new_inventory_item]').click();

      cy.url().should("include", "/inventory/new");

      cy.get('input[name=product_name]').type("CY MacBook Air 15-inch");
      cy.get('input[name=sku]').type("CY-MWQ");
      cy.get('input[name=po]').type(1019331);
      cy.get('input[name=price]').type(1629.99);
      cy.get('input[name=quantity_ordered]').type(50);
      cy.get('input[name=quantity_arrived]').type(0);
      cy.get('input[name=quantity_available]').type(0);
      cy.get('input[name=vendor]').type("CDW");
      cy.get('input[name=status]').type("On-Order");
      cy.get('input[name=category]').type("Computers");
      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory");
      cy.contains("CY MacBook Air 15-inch").should("exist");
  
      
    });
  });




  describe("Create New Stock item with missing text fields", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/inventory");
      cy.get('button[name=new_inventory_item]').click();

      cy.url().should("include", "/inventory/new");

      //cy.get('input[name=product_name]').type("CY MacBook Air 15-inch");
      cy.get('input[name=sku]').type("CY-MWQ");
      cy.get('input[name=po]').type(1019331);
      cy.get('input[name=price]').type(1629.99);
      cy.get('input[name=quantity_ordered]').type(50);
      cy.get('input[name=quantity_arrived]').type(0);
      cy.get('input[name=quantity_available]').type(0);
      cy.get('input[name=vendor]').type("CDW");
      cy.get('input[name=status]').type("On-Order");
      //cy.get('input[name=category]').type("Computers");
      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory/new");
      cy.contains("Item added successfully!").should("not.exist");
  
      
    });
  });



  describe("Create New Stock item with missing numeric fields", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/inventory");
      cy.get('button[name=new_inventory_item]').click();

      cy.url().should("include", "/inventory/new");

      cy.get('input[name=product_name]').type("CY MacBook Air 15-inch");
      cy.get('input[name=sku]').type("CY-MWQ");
      cy.get('input[name=po]').type(1019331);
      cy.get('input[name=price]').type(1629.99);
      //cy.get('input[name=quantity_ordered]').type(50);
      cy.get('input[name=quantity_arrived]').type(0);
      cy.get('input[name=quantity_available]').type(0);
      cy.get('input[name=vendor]').type("CDW");
      cy.get('input[name=status]').type("On-Order");
      cy.get('input[name=category]').type("Computers");
      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory/new");
      cy.contains("Item added successfully!").should("not.exist");
  
      
    });
  });










  /*
*******************************************************************************************************
READ
*******************************************************************************************************
*/



describe("Read Stock Check", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/inventory");
    
      //my default orders
      cy.contains("1019963").should("exist");
      cy.contains("PO-24-25").should("exist");
  
      
    });
  });












/*
*******************************************************************************************************
UPDATE
*******************************************************************************************************
*/



describe("Update Stock Item", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");


      cy.visit("http://localhost:3000/inventory");
      cy.get('button[name=new_inventory_item]').click();

      cy.url().should("include", "/inventory/new");

      cy.get('input[name=product_name]').type("To be edited!");
      cy.get('input[name=sku]').type("EDIT");
      cy.get('input[name=po]').type(9999999);
      cy.get('input[name=price]').type(1);
      cy.get('input[name=quantity_ordered]').type(100);
      cy.get('input[name=quantity_arrived]').type(0);
      cy.get('input[name=quantity_available]').type(0);
      cy.get('input[name=vendor]').type("test");
      cy.get('input[name=status]').type("On-Order");
      cy.get('input[name=category]').type("Misc");
      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory");


      cy.get('[data-cy="edit-stock-9999999"]').click(); 


      // update two fields
      cy.get('input[name=sku]').clear().type("CY-MWQ-UPDATED");
      cy.get('input[name=status]').clear().type("Delivered");


      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory");
      cy.contains("CY-MWQ-UPDATED").should("exist");
  
      
    });
  });


  describe("Update Stock Item Quantities", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");


      cy.visit("http://localhost:3000/inventory");
      cy.get('button[name=new_inventory_item]').click();

      cy.url().should("include", "/inventory/new");

      cy.get('input[name=product_name]').type("editing quanitties!");
      cy.get('input[name=sku]').type("EDIT2");
      cy.get('input[name=po]').type(9999991);
      cy.get('input[name=price]').type(1);
      cy.get('input[name=quantity_ordered]').type(100);
      cy.get('input[name=quantity_arrived]').type(0);
      cy.get('input[name=quantity_available]').type(0);
      cy.get('input[name=vendor]').type("test");
      cy.get('input[name=status]').type("On-Order");
      cy.get('input[name=category]').type("Misc");
      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory");


      cy.get('[data-cy="edit-stock-9999991"]').click(); 


      // update two fields
      cy.get('input[name=sku]').clear().type("EDIT2_Updated");
      cy.get('input[name=quantity_ordered]').clear().type(50);
      cy.get('input[name=quantity_arrived]').clear().type(50);
      cy.get('input[name=quantity_available]').clear().type(25);


      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory");
      cy.contains("EDIT2").should("exist");
  
      
    });
  });












/*
*******************************************************************************************************
DELETE
*******************************************************************************************************
*/


describe("Delete Stock item YES", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/inventory");
      cy.get('button[name=new_inventory_item]').click();

      cy.url().should("include", "/inventory/new");

      cy.get('input[name=product_name]').type("I will be deleted");
      cy.get('input[name=sku]').type("deleteME");
      cy.get('input[name=po]').type(9999988);
      cy.get('input[name=price]').type(101.01);
      cy.get('input[name=quantity_ordered]').type(10);
      cy.get('input[name=quantity_arrived]').type(3);
      cy.get('input[name=quantity_available]').type(3);
      cy.get('input[name=vendor]').type("CDW");
      cy.get('input[name=status]').type("Partially Received");
      cy.get('input[name=category]').type("Computers");
      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory");
      cy.contains("deleteME").should("exist");

      cy.get('[data-cy="delete-stock-9999988"]').click(); 

        // pop up for delete nbutton
        cy.get('[data-cy="confirm_delete"]')
        .should('have.length.greaterThan', 0)
        .first()
        .click({ force: true });
      




      cy.wait(500); 
      cy.contains("deleteME").should("not.exist");
      
    });
  });

  describe("Delete Stock item NO", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/inventory");
      cy.get('button[name=new_inventory_item]').click();

      cy.url().should("include", "/inventory/new");

      cy.get('input[name=product_name]').type("I will NOT deleted");
      cy.get('input[name=sku]').type("no-deleteME");
      cy.get('input[name=po]').type(99993);
      cy.get('input[name=price]').type(101.01);
      cy.get('input[name=quantity_ordered]').type(10);
      cy.get('input[name=quantity_arrived]').type(3);
      cy.get('input[name=quantity_available]').type(3);
      cy.get('input[name=vendor]').type("CDW");
      cy.get('input[name=status]').type("Delivered");
      cy.get('input[name=category]').type("Misc");
      cy.get('button[type=submit]').click();

      cy.url().should("include", "/inventory");
      cy.contains("no-deleteME").should("exist");

      cy.get('[data-cy="delete-stock-99993"]').click(); 

    // pop up for delete nbutton
    cy.get('[data-cy="cancel-btn"]')
    .should('have.length.greaterThan', 0)
    .first()
    .click({ force: true });

    cy.contains("no-deleteME").should("exist");
      




      cy.wait(500);
      cy.contains("deleteME").should("not.exist");
      
    });
  });
