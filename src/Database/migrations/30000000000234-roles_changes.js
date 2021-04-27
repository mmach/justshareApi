



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
      ALTER TABLE Roles
        ADD  project_id char(36)

      ALTER TABLE [dbo].[Roles]  WITH CHECK ADD  CONSTRAINT [FK_Roles_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    

      ALTER TABLE [dbo].[Roles]  DROP  CONSTRAINT [FK_Roles_Project] 
      
      ALTER TABLE Roles
        DROP COLUMN  project_id
   
           `
      )
  }
};







