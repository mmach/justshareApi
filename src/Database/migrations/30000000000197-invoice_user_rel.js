

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
      
        ALTER TABLE [dbo].[InvoicesUsers]  WITH CHECK ADD  CONSTRAINT [FK_InvoicesUsers_Users] FOREIGN KEY([user_id])  REFERENCES [dbo].[Users] ([id])
        ALTER TABLE [dbo].[InvoicesUsers]  WITH CHECK ADD  CONSTRAINT [FK_InvoicesUsers_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])
       

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          
      ALTER TABLE [dbo].[InvoicesUsers]  DROP  CONSTRAINT [FK_InvoicesUsers_Users] 
     
      ALTER TABLE [dbo].[InvoicesUsers]  DROP  CONSTRAINT [FK_InvoicesUsers_Project] 

        `
      )
  }
};







