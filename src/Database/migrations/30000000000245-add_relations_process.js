



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[ProcessChainActionInjections]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainActionInjections_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].[ProcessChainActionInjections]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainActionInjections_ActionsProject] FOREIGN KEY([action_id])  REFERENCES [dbo].[ActionsProjects] ([id])

        ALTER TABLE [dbo].[ProcessChainActionInjections]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainActionInjections_ProcessChains] FOREIGN KEY([process_chain_id])  REFERENCES [dbo].[ProcessChains] ([id]) 
        
        
        ALTER TABLE [dbo].ProcessChainPrivileges  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainPrivileges_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].ProcessChainPrivileges  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainPrivileges_PrivilegesProjects] FOREIGN KEY(privilege_id)  REFERENCES [dbo].PrivilegesProjects ([id])

        ALTER TABLE [dbo].ProcessChainPrivileges  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainPrivileges_ProcessChains] FOREIGN KEY([process_chain_id])  REFERENCES [dbo].[ProcessChains] ([id])

		     ALTER TABLE [dbo].ProcessChainPrivileges  WITH CHECK ADD  CONSTRAINT [FK_ProcessChainPrivileges_ProcessChainActionInjections] FOREIGN KEY([process_chain_action_id])  REFERENCES [dbo].[ProcessChainActionInjections] ([id])


        
        
        `


      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
  
      ALTER TABLE [dbo].ProcessChainPrivileges  DROP  CONSTRAINT [FK_ProcessChainPrivileges_Project] 
      ALTER TABLE [dbo].ProcessChainPrivileges  DROP  CONSTRAINT [FK_ProcessChainPrivileges_PrivilegesProjects]
        ALTER TABLE [dbo].ProcessChainPrivileges  DROP  CONSTRAINT [FK_ProcessChainPrivileges_ProcessChains]
        ALTER TABLE [dbo].ProcessChainPrivileges  DROP  CONSTRAINT [FK_ProcessChainPrivileges_ProcessChainActionInjections]

      ALTER TABLE [dbo].[ProcessChainActionInjections]  DROP  CONSTRAINT [FK_ProcessChainActionInjections_ProcessChains] 
      ALTER TABLE [dbo].[ProcessChainActionInjections]  DROP  CONSTRAINT [FK_ProcessChainActionInjections_ActionsProject]
        ALTER TABLE [dbo].[ProcessChainActionInjections]  DROP  CONSTRAINT [FK_ProcessChainActionInjections_Project]
             
        `
      )
  }
};







