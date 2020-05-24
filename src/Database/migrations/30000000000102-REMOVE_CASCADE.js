"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Items] DROP CONSTRAINT [FK_user_id_items]

        
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_user_id_items] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])


       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[Items] DROP CONSTRAINT [FK_user_id_items]

      ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_user_id_items] FOREIGN KEY([user_id])
      REFERENCES [dbo].[Users] ([id])
      ON DELETE CASCADE

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
