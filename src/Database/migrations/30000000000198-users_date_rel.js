

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
     
          ALTER TABLE [dbo].[UserInvoicesValues]  WITH CHECK ADD  CONSTRAINT [FK_UserInvoicesValues_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[UserInvoicesValues]  DROP CONSTRAINT [FK_UserInvoicesValues_Project] 
      `
      )
  }
};







