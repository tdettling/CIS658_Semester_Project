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

describe("Create ISD", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/ISDs");
    
      //my default orders
      cy.contains("10001001").should("exist");
      cy.contains("10001004").should("exist");

      cy.get('button[name=newstock_button]').click();

      cy.get('input[name=requestor_name]').type("TESTING NEW!");
        cy.get('input[name=requestor_email]').type("new1@gvsu.edu");
        cy.get('input[name=requestor_address]').type("some hall here, 1 campus dr");
        cy.get('input[name=cc]').type("CC IT will pay");
        cy.get('input[name=ticket_number]').type("999999");
        cy.get('input[name=status]').type("New");

        cy.get('button[type=submit]').click();

      cy.url().should("include", "/ISDs");
      cy.contains("TESTING NEW!").should("exist");

  
      
    });
  });


  describe("Create ISD w/missing fields", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/ISDs");
    
      //my default orders
      cy.contains("10001001").should("exist");
      cy.contains("10001004").should("exist");

      cy.get('button[name=newstock_button]').click();

      cy.get('input[name=requestor_name]').type("TESTING NEW improper!");
        cy.get('input[name=requestor_email]').type("new1@gvsu.edu");
        cy.get('input[name=requestor_address]').type("some hall here, 1 campus dr");
        //cy.get('input[name=cc]').type("CC IT will pay");
        cy.get('input[name=ticket_number]').type("999999");
        //cy.get('input[name=status]').type("New");

        cy.get('button[type=submit]').click();

      cy.url().should("include", "/ISDs/new");
      cy.contains("Item added successfully!").should("not.exist");

  
      
    });
  });












/*
*******************************************************************************************************
READ
*******************************************************************************************************
*/




describe("Read Page ISDs", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/ISDs");
    
      //my default orders
      cy.contains("10001001").should("exist");
      cy.contains("10001004").should("exist");
  
      
    });
  });















/*
*******************************************************************************************************
UPDATE (FULFILL ISDs)
*******************************************************************************************************
*/



describe("Fulfill ISD 1", () => {
    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
      cy.visit("http://localhost:3000");
  

      cy.get('input[name=username]').type("test");
      cy.get('input[name=password]').type("test");
      cy.get('button[type=submit]').click();
  

      cy.url().should("include", "/Home");

      cy.visit("http://localhost:3000/ISDs");
    
      //my default orders
      cy.contains("10001001").should("exist");
      cy.contains("10001004").should("exist");

      cy.get('button[name=newstock_button]').click();

      cy.get('input[name=requestor_name]').type("TESTING updating!!");
        cy.get('input[name=requestor_email]').type("update1@gvsu.edu");
        cy.get('input[name=requestor_address]').type("some hall here, 1 campus dr");
        cy.get('input[name=cc]').type("CC IT will pay");
        cy.get('input[name=ticket_number]').type("63699");
        cy.get('input[name=status]').type("New");

        cy.get('button[type=submit]').click();

      cy.url().should("include", "/ISDs");
      cy.contains("TESTING updating!!").should("exist");
      cy.wait(500);
      cy.get('[data-cy="fulfill-ISD-63699"]').should("exist").click();


        /* ==== Generated with Cypress Studio ==== */
        cy.get('.add-line-button > svg').click();
        cy.wait(1500);
        cy.get('.add-line-button > svg').click();

        cy.get('form[id^="line-item-form-"] input[name="fulfilled_sku"]', { timeout: 6000 }).should("exist").type("GVSU");
        cy.get('#SKU').clear('G');
        cy.get('#SKU').type('GVSU');
        cy.get('#Quantity').clear('1');
        cy.get('#Quantity').type('1');
        cy.get('#TotalPrice').clear('1');
        cy.get('#TotalPrice').type('150');
        cy.get('#Memo').clear('T');
        cy.get('#Memo').type('TEST');
        cy.get('.autocomplete').click();
        cy.get('#Date').clear('2');
        cy.get('#Date').type('2025-04-19');
        cy.get('.content-area > :nth-child(1) > :nth-child(8)').click();
        /* ==== End Cypress Studio ==== */

            });
        });



        describe("Fulfill ISD 2 with errors", () => {
            it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
              cy.visit("http://localhost:3000");
          
        
              cy.get('input[name=username]').type("test");
              cy.get('input[name=password]').type("test");
              cy.get('button[type=submit]').click();
          
        
              cy.url().should("include", "/Home");
        
              cy.visit("http://localhost:3000/ISDs");
            
              //my default orders
              cy.contains("10001001").should("exist");
              cy.contains("10001004").should("exist");
        
              cy.get('button[name=newstock_button]').click();
        
              cy.get('input[name=requestor_name]').type("TESTING fail updating!!!");
                cy.get('input[name=requestor_email]').type("update1@gvsu.edu");
                cy.get('input[name=requestor_address]').type("some hall here, 1 campus dr");
                cy.get('input[name=cc]').type("CC IT will pay");
                cy.get('input[name=ticket_number]').type("100055");
                cy.get('input[name=status]').type("New");
        
                cy.get('button[type=submit]').click();
        
              cy.url().should("include", "/ISDs");
              cy.contains("TESTING fail updating!!!").should("exist");
              cy.wait(500);
              cy.get('[data-cy="fulfill-ISD-100055"]').should("exist").click();
        
        
                /* ==== Generated with Cypress Studio ==== */
                cy.get('.add-line-button > svg').click();
                cy.wait(1500);
                cy.get('.add-line-button > svg').click();
        
                cy.get('form[id^="line-item-form-"] input[name="fulfilled_sku"]', { timeout: 6000 }).should("exist").type("GVSU");
                cy.get('#SKU').clear('G');
                cy.get('#SKU').type('GVSU');
                cy.get('#Quantity').clear('1');
                cy.get('#Quantity').type('1');
                cy.get('#TotalPrice').clear('1');
                cy.get('#TotalPrice').type('150');
                cy.get('#Memo').clear('T');
                cy.get('#Memo').type('TEST');
                cy.get('.autocomplete').click();
                //cy.get('#Date').clear('2');
                //cy.get('#Date').type('2025-04-19');
                cy.get('.content-area > :nth-child(1) > :nth-child(8)').click();
                /* ==== End Cypress Studio ==== */

                    // should still be on same page, can't submit with missing params
                    cy.url().should("include", "/ISDs/");
        
                    });
                });



                describe("Fulfill ISD 3, status change", () => {
                    it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
                      cy.visit("http://localhost:3000");
                  
                
                      cy.get('input[name=username]').type("test");
                      cy.get('input[name=password]').type("test");
                      cy.get('button[type=submit]').click();
                  
                
                      cy.url().should("include", "/Home");
                
                      cy.visit("http://localhost:3000/ISDs");
                    
                      //my default orders
                      cy.contains("10001001").should("exist");
                      cy.contains("10001004").should("exist");
                
                      cy.get('[data-cy="fulfill-ISD-100055"]').should("exist").click();
        
        
                        /* ==== Generated with Cypress Studio ==== */
                        cy.get('.add-line-button > svg').click();
                        cy.wait(1500);
                        cy.get('.add-line-button > svg').click();
                
                        cy.get('form[id^="line-item-form-"] input[name="fulfilled_sku"]', { timeout: 6000 }).should("exist").type("GVSU");
                        cy.get('#SKU').clear('G');
                        cy.get('#SKU').type('GVSU');
                        cy.get('#Quantity').clear('1');
                        cy.get('#Quantity').type('1');
                        cy.get('#TotalPrice').clear('1');
                        cy.get('#TotalPrice').type('150');
                        cy.get('#Memo').clear('T');
                        cy.get('#Memo').type('TEST');
                        cy.get('.autocomplete').click();
                        //cy.get('#Date').clear('2');
                        //cy.get('#Date').type('2025-04-19');
                        cy.get('.content-area > :nth-child(1) > :nth-child(8)').click();
                        /* ==== End Cypress Studio ==== */

                    // should still be on same page, can't submit with missing params
                    cy.url().should("include", "/ISDs/");
                
                        /* ==== Generated with Cypress Studio ==== */
                        cy.get('.dropbtn').click();
                        cy.get('.dropdown-content > :nth-child(2)').click();
                        cy.get('.status-container > .submit-button').click();
                        cy.get('.back_button').click();
                        /* ==== End Cypress Studio ==== */
                        cy.get('#order-ISD-table').contains('TESTING status change!!').should('exist');

                       
                
                            });
                        });











/*
*******************************************************************************************************
DELETE
*******************************************************************************************************
*/


      


    describe("Delete ISD with errors", () => {
        it("logs in and navigates to /Home, then navigates to /ISDs with requestor query param", () => {
          cy.visit("http://localhost:3000");
      
    
          cy.get('input[name=username]').type("test");
          cy.get('input[name=password]').type("test");
          cy.get('button[type=submit]').click();
      
    
          cy.url().should("include", "/Home");
    
          cy.visit("http://localhost:3000/ISDs");
        
          //my default orders
          cy.contains("10001001").should("exist");
          cy.contains("10001004").should("exist");

          /* ==== Generated with Cypress Studio ==== */
            cy.get('.addStockIcon > path').click();
            cy.get(':nth-child(1) > input').clear('T');
            cy.get(':nth-child(1) > input').type('Test to DELETE 1');
            cy.get(':nth-child(2) > input').clear('d');
            cy.get(':nth-child(2) > input').type('delete@gvsu.edu');
            cy.get(':nth-child(3) > input').clear('some hall here, 1 campus dr');
            cy.get(':nth-child(3) > input').type('some hall here, 1 campus dr');
            cy.get(':nth-child(4) > input').clear('CC IT will pay');
            cy.get(':nth-child(4) > input').type('CC IT will pay');
            cy.get(':nth-child(5) > input').clear('6');
            cy.get(':nth-child(5) > input').type('65777');
            cy.get(':nth-child(6) > input').clear('New');
            cy.get(':nth-child(6) > input').type('New');
            cy.get(':nth-child(7) > button').click();
            cy.get('#item-0').clear('P');
            cy.get('#item-0').type('P2425HE Monitor');
            cy.get('.autocomplete').click();
            cy.get('#quantity-0').clear();
            cy.get('#quantity-0').type('3');
            cy.get('[type="submit"]').click();
            cy.get('[data-cy="delete-ISD-65777"] > .editStockIcon > [d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"]').click();
            cy.get('[data-cy="confirm_delete"]').click();
            /* ==== End Cypress Studio ==== */
    
            cy.wait(500);
            cy.contains("Test to DELETE 1").should("not.exist");
    
                });
            });