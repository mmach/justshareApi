"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[DimensionsProjects]  WITH CHECK ADD  CONSTRAINT [FK_DimensionsProjects_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].[DimensionsProjects]  WITH CHECK ADD  CONSTRAINT [FK_DimensionsProjects_Translations] FOREIGN KEY([translation_id])
        REFERENCES [dbo].[Translations] ([id])   

        ALTER TABLE [dbo].[DimensionsProjects]  WITH CHECK ADD  CONSTRAINT [FK_DimensionsProjects_Dimensions] FOREIGN KEY([dimension_id])
        REFERENCES [dbo].[Dimensions] ([id])  
  

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[DimensionsProjects] DROP CONSTRAINT [FK_DimensionsProjects_Projects]  

      ALTER TABLE [dbo].[DimensionsProjects] DROP CONSTRAINT [FK_DimensionsProjects_Translations]  
      ALTER TABLE [dbo].[DimensionsProjects] DROP CONSTRAINT [FK_DimensionsProjects_Dimensions]  


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


