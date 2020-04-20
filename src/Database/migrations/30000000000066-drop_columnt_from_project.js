"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        
       ALTER TABLE [dbo].[Projects] DROP CONSTRAINT [FK_Projects_User]
       
       
       ALTER TABLE Projects
       DROP COLUMN user_id

       

  


        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE Projects
      ADD  user_id char(36) 


      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
