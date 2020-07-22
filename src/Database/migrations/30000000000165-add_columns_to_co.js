"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
           ALTER TABLE CategoryOptions
           ADD dim_id char(36)

           
          ALTER TABLE [dbo].[CategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_CategoryOptions_DimensionsProjects] FOREIGN KEY([dim_id])
          REFERENCES [dbo].[DimensionsProjects] ([id])


          
          ALTER TABLE CategoryOptionsTemplates
          ADD dim_id char(36)

          
         ALTER TABLE [dbo].[CategoryOptionsTemplates]  WITH CHECK ADD  CONSTRAINT [FK_CategoryOptionsTemplates_DimensionsProjects] FOREIGN KEY([dim_id])
         REFERENCES [dbo].[DimensionsProjects] ([id])
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            ALTER TABLE CategoryOptionsTemplates
            DROP COLUMN dim_id


          ALTER TABLE [dbo].[CategoryOptionsTemplates]  DROP  CONSTRAINT [FK_CategoryOptionsTemplates_DimensionsProjects] 

          ALTER TABLE CategoryOptions
          DROP COLUMN dim_id


        ALTER TABLE [dbo].[CategoryOptions]  DROP  CONSTRAINT [FK_CategoryOptions_DimensionsProjects] 

        

             `
      )
  }
};
