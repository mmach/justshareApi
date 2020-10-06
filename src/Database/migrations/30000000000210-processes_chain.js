

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

    
        ALTER TABLE [dbo].[ProcessChains]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChanins_StatusProject] FOREIGN KEY([status_id])  REFERENCES [dbo].[StatusProjects] ([id])
        ALTER TABLE [dbo].[ProcessChains]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChanins_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[ProcessChains]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChanins_ActionProjects] FOREIGN KEY([action_id])  REFERENCES [dbo].[ActionsProjects] ([id])
        ALTER TABLE [dbo].[ProcessChains]  WITH CHECK ADD  CONSTRAINT [FK_ProcessChanins_Processes] FOREIGN KEY([process_id])  REFERENCES [dbo].[Processes] ([id])

  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[ProcessChains]  DROP  CONSTRAINT [FK_ProcessChanins_StatusProject]
      ALTER TABLE [dbo].[ProcessChains]  DROP  CONSTRAINT [FK_ProcessChanins_Project] 
      ALTER TABLE [dbo].[ProcessChains]  DROP  CONSTRAINT [FK_ProcessChanins_ActionProjects]
      ALTER TABLE [dbo].[ProcessChains]  DROP  CONSTRAINT [FK_ProcessChanins_Processes]
    

           `
      )
  }
};







