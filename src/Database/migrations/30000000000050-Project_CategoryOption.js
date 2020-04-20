"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE [dbo].[CategoryOptionsProject]  WITH CHECK ADD  CONSTRAINT [FK_COP_CO] FOREIGN KEY([co_id])
        REFERENCES [dbo].[CategoryOptions] ([id])
        
        ALTER TABLE [dbo].[CategoryOptionsProject]  WITH CHECK ADD  CONSTRAINT [FK_COP_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      ALTER TABLE [dbo].[CategoryOptionsProject] DROP CONSTRAINT [FK_COP_CO]
      
      ALTER TABLE [dbo].[CategoryOptionsProject] DROP CONSTRAINT [FK_COP_Project]
   
        
    `);
  }
};
