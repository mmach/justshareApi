



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
      ALTER TABLE Statuses
        ADD  project_id char(36)

      ALTER TABLE [dbo].[Statuses]  WITH CHECK ADD  CONSTRAINT [FK_Statuses_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    

      ALTER TABLE [dbo].[Statuses]  DROP  CONSTRAINT [FK_Statuses_Project] 
      
      ALTER TABLE Statuses
        DROP COLUMN  project_id
   
           `
      )
  }
};







