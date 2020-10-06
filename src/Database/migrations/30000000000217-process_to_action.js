

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      

      ALTER TABLE [ActionsProjects]
      ADD process_id char(36)
      
  ALTER TABLE Actions
        ADD is_process_invoker bit
        
        ALTER TABLE [dbo].[ActionsProjects]  WITH CHECK ADD  CONSTRAINT [FK_ActionsProjects_Processes] FOREIGN KEY([process_id])  REFERENCES [dbo].[Processes] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[ActionsProjects]  WITH CHECK ADD  DROP CONSTRAINT [FK_ActionsProjects_Processes]

      ALTER TABLE [ActionsProjects]
      DROP COLUMN process_id 
      
  ALTER TABLE Actions
        DROP COLUMN is_process_invoker
    

           `
      )
  }
};







