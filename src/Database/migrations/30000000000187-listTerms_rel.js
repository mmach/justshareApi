

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
        ALTER TABLE [dbo].[ItemCategoryOptionTerms]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptionTerms_COL] FOREIGN KEY([col_id])
        REFERENCES [dbo].[CategoryOptionsLinks] ([id])

      
        
        ALTER TABLE [dbo].[ItemCategoryOptionTerms]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptionTerms_COT] FOREIGN KEY([co_temp_id])
        REFERENCES [dbo].[CategoryOptionsTemplates] ([id])

        
        
        
        ALTER TABLE [dbo].[ItemCategoryOptionTerms]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptionTerms_Items] FOREIGN KEY([item_id])
        REFERENCES [dbo].[Items] ([id])

        
        
        
        ALTER TABLE [dbo].[ItemCategoryOptionTerms]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptionTerms_DimensionsProjects] FOREIGN KEY([dim_id])
        REFERENCES [dbo].[DimensionsProjects] ([id])

                
        ALTER TABLE [dbo].[ItemCategoryOptionTerms]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptionTerms_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        
        
        ALTER TABLE [dbo].[ItemCategoryOptionTerms]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptionTerms_ItemUserAction] FOREIGN KEY([iua_id])
        REFERENCES [dbo].[ItemUserActions] ([id])

        
        
        
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[ItemCategoryOptionTerms]  DROP CONSTRAINT [FK_ItemCategoryOptionTerms_COL] 

    
      
      ALTER TABLE [dbo].[ItemCategoryOptionTerms]  DROP  CONSTRAINT [FK_ItemCategoryOptionTerms_COT] 

      
      
      
      ALTER TABLE [dbo].[ItemCategoryOptionTerms]  DROP  CONSTRAINT [FK_ItemCategoryOptionTerms_Items] 

      
      
      
      ALTER TABLE [dbo].[ItemCategoryOptionTerms]  DROP  CONSTRAINT [FK_ItemCategoryOptionTerms_DimensionsProjects] 

              
      ALTER TABLE [dbo].[ItemCategoryOptionTerms]  DROP  CONSTRAINT [FK_ItemCategoryOptionTerms_Project] 

      
      
      ALTER TABLE [dbo].[ItemCategoryOptionTerms]  DROP   CONSTRAINT [FK_ItemCategoryOptionTerms_ItemUserAction] 


        
    
        `
      )
  }
};







