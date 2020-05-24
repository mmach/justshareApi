"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[Projects]  
        ADD auth_url nvarchar(500)

        ALTER TABLE [dbo].[Blobs]  
        ADD project_id char(36)

        ALTER TABLE [dbo].[Blobs]  WITH CHECK ADD  CONSTRAINT [FK_Blobs_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[Blobs]  DROP  CONSTRAINT [FK_Blobs_Projects] 

      ALTER TABLE [dbo].[Blobs]
        DROP  project_id
        
      ALTER TABLE [dbo].[Projects]
        DROP  auth_url
  `
      )
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */


