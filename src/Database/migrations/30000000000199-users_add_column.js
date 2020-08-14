

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
     
          ALTER TABLE [dbo].[Users]
          ADD user_invoice_data_id char(36)

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[Users]
      DROP COLUMN user_invoice_data_id
           `
      )
  }
};







