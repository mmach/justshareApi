

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE Invoices
        ADD  status_id char(36) 
  
        
        ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_StatusProjects] FOREIGN KEY([status_id]) 
         REFERENCES [dbo].[StatusProjects] ([id])


    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE Invoices
      DROP COLUMN status_id  
      ALTER TABLE [dbo].[Invoices DROP CONSTRAINT [FK_Invoices_StatusProjects]


           `
      )
  }
};







