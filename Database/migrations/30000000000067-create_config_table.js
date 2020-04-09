"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].[Configs](
          id char(36) PRIMARY KEY,
          project_id char(36),
          type nvarchar(150),
          lang nvarchar(300), 
          body nvarchar(max),
          [created_at] [datetimeoffset](7) NULL,
          [updated_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]   

       
        ALTER TABLE [dbo].[Configs]  WITH CHECK ADD  CONSTRAINT [FK_Configs_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])
        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      DROP TABLE Configs
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
