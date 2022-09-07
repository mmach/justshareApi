



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptionsTemplates
        ADD is_prefix bit

        ALTER TABLE CategoryOptionsTemplates
        ADD is_suffix bit
       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN is_prefix

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN is_suffix
        `
      )
  }
};







