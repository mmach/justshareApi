"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     --  DROP TABLE CategoryProjects
     --  DROP TABLE CategoryOptionsProjects

 ALTER TABLE Categories
 ADD  project_id char(36)

 ALTER TABLE CategoryOptions
 ADD  project_id char(36)

 ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_Project] FOREIGN KEY([project_id])
 REFERENCES [dbo].[Projects] ([id])

 
 ALTER TABLE [dbo].[CategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_CategoryOptions_Project] FOREIGN KEY([project_id])
 REFERENCES [dbo].[Projects] ([id])



        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[CategoryOptions] DROP CONSTRAINT [FK_CategoryOptions_Project]  
      ALTER TABLE [dbo].[CategoryOptions] 
      DROP COLUMN project_id 


      ALTER TABLE [dbo].[Categories] DROP CONSTRAINT [FK_Categories_Project]  

       ALTER TABLE [dbo].[Categories] 
        DROP COLUMN project_id 
  

      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
