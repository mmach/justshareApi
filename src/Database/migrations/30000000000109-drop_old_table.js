
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
         

        DROP TABLE UserTypesUser
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      CREATE TABLE [dbo].[UserTypesUser](
        [id] [char](36) NOT NULL,
        [user_id] [char](36) NULL,
        [project_id] [char](36) NULL,
        [created_at] [datetimeoffset](7) NULL,
        [updated_at] [datetimeoffset](7) NULL,
        [usertype_id] [char](36) NULL,
      PRIMARY KEY CLUSTERED 
      (
        [id] ASC
      )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
      ) ON [PRIMARY]
      
      
      ALTER TABLE [dbo].[UserTypesUser]  WITH CHECK ADD  CONSTRAINT [FK_ProjectUser_Project] FOREIGN KEY([user_id])
      REFERENCES [dbo].[Users] ([id])
      
      
      ALTER TABLE [dbo].[UserTypesUser] CHECK CONSTRAINT [FK_ProjectUser_Project]
      
      
      ALTER TABLE [dbo].[UserTypesUser]  WITH CHECK ADD  CONSTRAINT [FK_User_Project] FOREIGN KEY([project_id])
      REFERENCES [dbo].[Projects] ([id])
      
      
      ALTER TABLE [dbo].[UserTypesUser] CHECK CONSTRAINT [FK_User_Project]
      
      
      ALTER TABLE [dbo].[UserTypesUser]  WITH CHECK ADD  CONSTRAINT [FK_UserTypesUser_UserTypesProject] FOREIGN KEY([usertype_id])
      REFERENCES [dbo].[RolesProject] ([id])
      
      
      ALTER TABLE [dbo].[UserTypesUser] CHECK CONSTRAINT [FK_UserTypesUser_UserTypesProject]
      
   
     
 `
      )
  }
};







