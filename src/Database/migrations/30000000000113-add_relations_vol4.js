
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
         
        ALTER TABLE Users
        ADD usertype_id char(36)

        ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_UserTypes] FOREIGN KEY([usertype_id])
        REFERENCES [dbo].[UserTypes] ([id])

           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     
      ALTER TABLE [dbo].[Users] DROP COLUMN usertype_id  
     


   
     
 `
      )
  }
};







