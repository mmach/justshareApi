"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Tags] 
        ADD project_id char(36)

        ALTER TABLE [dbo].[Tags]  WITH CHECK ADD  CONSTRAINT [FK_Tag_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])


        ALTER TABLE [dbo].[CategoryOptionsLinks] 
        ADD project_id char(36)

        ALTER TABLE [dbo].[CategoryOptionsLinks]  WITH CHECK ADD  CONSTRAINT [FK_CategoryOptionsLinks_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[Tags] DROP CONSTRAINT [FK_Tag_Project]  
      ALTER TABLE [dbo].[Tags] 
      DROP COLUMN project_id 
      ALTER TABLE [dbo].[Tags] DROP CONSTRAINT [FK_CategoryOptionsLinks_Project]  

       ALTER TABLE [dbo].[CategoryOptionsLinks] 
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
