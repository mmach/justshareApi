"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE ItemCategoryOptions 
        ADD  dim_id char(36);

        ALTER TABLE CategoryOptionsTemplates 
        ADD  is_readOnly bit;

        ALTER TABLE [dbo].[ItemCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptions_DimensionsProjects] FOREIGN KEY([dim_id])
        REFERENCES [dbo].[DimensionsProjects] ([id])
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[ItemCategoryOptions]  DROP CONSTRAINT [FK_ItemCategoryOptions_DimensionsProjects] 

      ALTER TABLE ItemCategoryOptions 
        DROP COLUMN dim_id

        ALTER TABLE CategoryOptionsTemplates 
        DROP COLUMN is_readOnly ;
             `
      )
  }
};
