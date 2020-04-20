"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE [dbo].[CategoryProject]  WITH CHECK ADD  CONSTRAINT [FK_CATPROJ_CAT] FOREIGN KEY([category_id])
        REFERENCES [dbo].[Categories] ([id])
        
        ALTER TABLE [dbo].[CategoryProject]  WITH CHECK ADD  CONSTRAINT [FK_CATPROJ_PROJ] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      ALTER TABLE [dbo].[CategoryProject] DROP CONSTRAINT [FK_CATPROJ_PROJ]
      
      ALTER TABLE [dbo].[CategoryProject] DROP CONSTRAINT [FK_CATPROJ_CAT]
   
        
    `);
  }
};
