

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      
        ALTER TABLE [dbo].[ItemUserActions]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserActions_Processes] FOREIGN KEY([process_id])  REFERENCES [dbo].[Processes] ([id])
        ALTER TABLE [dbo].[ItemUserActions]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserActions_ProcessChains] FOREIGN KEY([process_chain_id])  REFERENCES [dbo].[ProcessChains] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[ItemUserActions] DROP  CONSTRAINT [FK_ItemUserActions_Processes]
      ALTER TABLE [dbo].[ItemUserActions]  DROP  CONSTRAINT [FK_ItemUserActions_ProcessChains] 
   
           `
      )
  }
};







