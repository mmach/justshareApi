



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       ALTER TABLE CategoryOptionsTemplates
       ADD token nvarchar(255)
       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptionsTemplates
      DROP COLUMN token         `
      )
  }
};







