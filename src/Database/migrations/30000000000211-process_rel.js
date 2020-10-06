

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

    
        ALTER TABLE [dbo].[Processes]  WITH CHECK ADD  CONSTRAINT [FK_Processes_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])
      
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[Processes]  DROP  CONSTRAINT [FK_Processes_Project] 
    

           `
      )
  }
};







