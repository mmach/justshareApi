

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

              
        ALTER TABLE [dbo].[ProcessChainStates]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainStates_ProcessChains] FOREIGN KEY([process_chain_id])  REFERENCES [dbo].[ProcessChains] ([id])
        ALTER TABLE [dbo].[ProcessChainStates]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainStates_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[ProcessChainStates]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainStates_Processes] FOREIGN KEY([process_id])  REFERENCES [dbo].[Processes] ([id])
        ALTER TABLE [dbo].[ProcessChainStates]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainStates_ProcessChains_NEXT] FOREIGN KEY([next_process_chain_id])  REFERENCES [dbo].[ProcessChains] ([id])

      
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[ProcessChainStates]  DROP  CONSTRAINT [FK_ProcessChainStates_ProcessChains] 
      ALTER TABLE [dbo].[ProcessChainStates]  DROP  CONSTRAINT [FK_ProcessChainStates_Project] 
      ALTER TABLE [dbo].[ProcessChainStates]  DROP  CONSTRAINT [FK_ProcessChainStates_Processes]
      ALTER TABLE [dbo].[ProcessChainStates]  DROP  CONSTRAINT [FK_ProcessChainStates_ProcessChains_NEXT]

    

           `
      )
  }
};







