"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].[UserProjects](
          id char(36) PRIMARY KEY,
          user_id char(36),
          project_id char(36),
          [created_at] [datetimeoffset](7) NULL,
          [updated_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]  
        
        

        ALTER TABLE [dbo].[UserProjects]  WITH CHECK ADD  CONSTRAINT [FK_User_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].[UserProjects]  WITH CHECK ADD  CONSTRAINT [FK_ProjectUser_Project] FOREIGN KEY([user_id])
        REFERENCES [dbo].[Users] ([id])
        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[UserProjects] DROP CONSTRAINT [FK_ProjectUser_Project]  

      ALTER TABLE [dbo].[UserProjects] DROP CONSTRAINT [FK_User_Project]  


      DROP TABLE [dbo].[UserProjects]
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
