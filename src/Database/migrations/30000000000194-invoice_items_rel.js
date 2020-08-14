

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
      
        ALTER TABLE [dbo].[InvoicesItems]  WITH CHECK ADD  CONSTRAINT [FK_InvoicesItems_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[InvoicesItems]  WITH CHECK ADD  CONSTRAINT [FK_InvoicesItems_Invoices] FOREIGN KEY([invoice_id])  REFERENCES [dbo].[Invoices] ([id])


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          
      ALTER TABLE [dbo].[InvoicesItems]  DROP  CONSTRAINT [FK_InvoicesItems_Project] 
      ALTER TABLE [dbo].[InvoicesItems]  DROP  CONSTRAINT [FK_InvoicesItems_Invoices] 
  
        `
      )
  }
};







