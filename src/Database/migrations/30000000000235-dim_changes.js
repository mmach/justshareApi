



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
      ALTER TABLE Dimensions
        ADD  project_id char(36)

      ALTER TABLE [dbo].[Dimensions]  WITH CHECK ADD  CONSTRAINT [FK_Dimensions_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    

      ALTER TABLE [dbo].[Dimensions]  DROP  CONSTRAINT [FK_Dimensions_Project] 
      
      ALTER TABLE Dimensions
        DROP COLUMN  project_id
   
           `
      )
  }
};







