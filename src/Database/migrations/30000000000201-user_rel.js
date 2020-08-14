

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    

        ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_USERS_UserInvoicesValues] FOREIGN KEY([user_invoice_data_id]) 
         REFERENCES [dbo].[UserInvoicesValues] ([id])

        
        

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[Users]  DROP CONSTRAINT [FK_USERS_UserInvoicesValues] 

           `
      )
  }
};







