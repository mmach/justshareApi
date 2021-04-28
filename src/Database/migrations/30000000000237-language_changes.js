



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
      ALTER TABLE Languages
        ADD  project_id char(36)

      ALTER TABLE [dbo].[Languages]  WITH CHECK ADD  CONSTRAINT [FK_Languages_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    

      ALTER TABLE [dbo].[Languages]  DROP  CONSTRAINT [FK_Languages_Project] 
      
      ALTER TABLE Languages
        DROP COLUMN  project_id
   
           `
      )
  }
};







