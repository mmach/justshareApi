"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        
        
        ALTER TABLE [dbo].[Blobs]  WITH CHECK ADD  CONSTRAINT [FK_Blobs_Category] FOREIGN KEY([category_id])
        REFERENCES [dbo].[Categories] ([id])
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      
      ALTER TABLE [dbo].[Blobs] DROP CONSTRAINT [FK_Blobs_Category]
   
        
    `);
  }
};
