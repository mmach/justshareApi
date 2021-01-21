

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

    ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_Processes] FOREIGN KEY([process_id])  REFERENCES [dbo].[Processes] ([id])


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[Categories]  DROP  CONSTRAINT [FK_Categories_Processes] 
  

   
           `
      )
  }
};







