

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
      ALTER TABLE Privileges
        ADD  project_id char(36)

      ALTER TABLE [dbo].[Privileges]  WITH CHECK ADD  CONSTRAINT [FK_Privileges_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    

      ALTER TABLE [dbo].[Actions]  DROP  CONSTRAINT [FK_Privileges_Project] 
      
      ALTER TABLE Privileges
        DROP COLUMN  project_id
   
           `
      )
  }
};







