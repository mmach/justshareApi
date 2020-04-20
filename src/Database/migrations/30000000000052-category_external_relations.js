"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE [dbo].[CategoryExternals]  WITH CHECK ADD  CONSTRAINT [FK_CE_Categories] FOREIGN KEY([category_id])
        REFERENCES [dbo].[Categories] ([id])
        
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      ALTER TABLE [dbo].[CategoryExternals] DROP CONSTRAINT [FK_CE_Categories]
      
   
        
    `);
  }
};
