"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE Projects
        ADD  blob_logo_id char(36)

        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Blobs] FOREIGN KEY([blob_logo_id])
        REFERENCES [dbo].[Blobs] ([id])

        ALTER TABLE Projects
        ADD  blob_logo_hor_id char(36)

        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Blobs_hor] FOREIGN KEY([blob_logo_hor_id])
        REFERENCES [dbo].[Blobs] ([id])

        ALTER TABLE Projects
        ADD  blob_logo_ver_id char(36)

        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Blobs_ver] FOREIGN KEY([blob_logo_ver_id])
        REFERENCES [dbo].[Blobs] ([id])

        ALTER TABLE Projects
        ADD  blob_main_id char(36)

        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Blobs_main] FOREIGN KEY([blob_main_id])
        REFERENCES [dbo].[Blobs] ([id])

        ALTER TABLE Projects
        ADD  blob_main_phone_id char(36)

        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Blobs_main_phone] FOREIGN KEY([blob_main_phone_id])
        REFERENCES [dbo].[Blobs] ([id])

        ALTER TABLE Projects
        ADD  description nvarchar(300)

        ALTER TABLE Projects
        ADD  user_id char(36)

        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Users] FOREIGN KEY([user_id])
        REFERENCES [dbo].[Users] ([id])

        ALTER TABLE Projects
        ADD  plan_id char(36)
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[Projects] DROP CONSTRAINT [FK_Projects_Blobs] 
      ALTER TABLE [dbo].[Projects]  DROP CONSTRAINT [FK_Projects_Blobs_hor] 
      ALTER TABLE [dbo].[Projects]  DROP CONSTRAINT [FK_Projects_Blobs_ver] 
       ALTER TABLE [dbo].[Projects]  DROP CONSTRAINT [FK_Projects_Blobs_main] 
       ALTER TABLE [dbo].[Projects]  DROP CONSTRAINT [FK_Projects_Users] 
       ALTER TABLE [dbo].[Projects]  DROP CONSTRAINT [FK_Projects_Blobs_main_phone] 




      ALTER TABLE Projects
      DROP COLUMN blob_main_phone_id

      ALTER TABLE Projects
      DROP COLUMN blob_main_id

        ALTER TABLE Projects
      DROP COLUMN blob_logo_hor_id

      ALTER TABLE Projects
      DROP COLUMN blob_logo_id

      ALTER TABLE Projects
      DROP COLUMN blob_logo_ver_id

      ALTER TABLE Projects
      DROP  COLUMN description

      
      ALTER TABLE Projects
      DROP  COLUMN user_id

      ALTER TABLE Projects
      DROP  COLUMN plan_id
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


