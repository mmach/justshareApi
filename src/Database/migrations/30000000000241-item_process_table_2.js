



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE Items
        ADD item_process_id char(36)

        




      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER  TABLE [dbo].Items
      DROP COLUMN item_process_id
           `
      )
  }
};







