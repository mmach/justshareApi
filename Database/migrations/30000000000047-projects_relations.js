"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_User] FOREIGN KEY([user_id])
        REFERENCES [dbo].[Users] ([id])
        
        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      ALTER TABLE [dbo].[Projects] DROP CONSTRAINT [FK_Projects_User]
      
      ALTER TABLE [dbo].[Projects] DROP CONSTRAINT [FK_Projects_Project]
   
        
    `);
  }
};
