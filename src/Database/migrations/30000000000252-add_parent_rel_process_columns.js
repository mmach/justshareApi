



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE ItemUserActions
        ADD parent_process_id char(36)
        
        ALTER TABLE ItemUserActions
        ADD parent_process_chain_id char(36)
        
        ALTER TABLE ItemUserActions
        ADD parent_iua_id char(36)

        ALTER TABLE ItemTransactions
        ADD parent_iua_id char(36)

        ALTER TABLE [dbo].[ItemUserActions]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserActions_Processes_External] FOREIGN KEY([parent_process_id])  REFERENCES [dbo].[Processes] ([id]) 

        ALTER TABLE [dbo].[ItemUserActions]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserActions_ProcessChains_EXTERNAL] FOREIGN KEY([parent_process_chain_id])  REFERENCES [dbo].[ProcessChains] ([id]) 

        ALTER TABLE [dbo].[ItemUserActions]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserActions_ItemUserActions_EXTERNAL] FOREIGN KEY([parent_iua_id])  REFERENCES [dbo].[ItemUserActions] ([id]) 

        ALTER TABLE [dbo].[ItemTransactions]  WITH CHECK ADD  CONSTRAINT [FK_ItemTransactions_ItemUserActions_EXTERNAL] FOREIGN KEY([parent_iua_id])  REFERENCES [dbo].[ItemUserActions] ([id]) 
        `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[ItemUserActions] DROP  CONSTRAINT [FK_ItemUserActions_Processes_External]

      ALTER TABLE [dbo].[ItemUserActions]  DROP   CONSTRAINT [FK_ItemUserActions_ProcessChains_EXTERNAL] 

      ALTER TABLE [dbo].[ItemUserActions]  DROP   CONSTRAINT [FK_ItemUserActions_ItemUserActions_EXTERNAL]  

      ALTER TABLE [dbo].[ItemTransactions]  DROP   CONSTRAINT [FK_ItemTransactions_ItemUserActions_EXTERNAL]  

      ALTER TABLE ItemUserActions
      DROP COLUMN parent_process_id 

      ALTER TABLE ItemUserActions
      DROP COLUMN parent_process_chain_id 

      ALTER TABLE ItemUserActions
      DROP COLUMN parent_iua_id 

      ALTER TABLE ItemTransactions
      DROP COLUMN  parent_iua_id
        `
      )
  }
};







