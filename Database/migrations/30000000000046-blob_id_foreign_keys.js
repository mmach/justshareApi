"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Items_Blobs] FOREIGN KEY([blob_id])
        REFERENCES [dbo].[Blobs] ([id])
        
        ALTER TABLE [dbo].[Blobs]  WITH CHECK ADD  CONSTRAINT [FK_Blobs_Category] FOREIGN KEY([category_id])
        REFERENCES [dbo].[Categories] ([id])
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      ALTER TABLE [dbo].[Categories] DROP CONSTRAINT [FK_Items_Blobs]
      
      ALTER TABLE [dbo].[Blobs] DROP CONSTRAINT [FK_Blobs_Category]
   
        
    `);
  }
};
