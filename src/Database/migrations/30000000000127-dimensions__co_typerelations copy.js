"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE Dimensions
        ADD  co_type_id char(36)

        ALTER TABLE [dbo].[Dimensions]  WITH CHECK ADD  CONSTRAINT [FK_Dimensions_CategoryOptionsTypes] FOREIGN KEY([co_type_id])
        REFERENCES [dbo].[CategoryOptionsTypes] ([id])

       

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[DimensionsProjects] DROP CONSTRAINT [FK_DimensionsProjects_Projects]  

      ALTER TABLE Dimensions
        DROP COLUMN co_type_id

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


