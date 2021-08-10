



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE [dbo].[ProcessChainActionInjections]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainActionInjections_ProcessChains_EXTERNAL] FOREIGN KEY([external_process_chain_id])  REFERENCES [dbo].[ProcessChains] ([id]) 
         
        ALTER TABLE [dbo].[ProcessChainActionInjections]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainActionInjections_Process__EXTERNAL] FOREIGN KEY([external_process_id])  REFERENCES [dbo].[Processes] ([id]) 

        `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[ProcessChainActionInjections]  DROP  CONSTRAINT [FK_ProcessChainActionInjections_ProcessChains_EXTERNAL]  
         
      ALTER TABLE [dbo].[ProcessChainActionInjections]  DROP  CONSTRAINT [FK_ProcessChainActionInjections_Process__EXTERNAL] 

        `
      )
  }
};







