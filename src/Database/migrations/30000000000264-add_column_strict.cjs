



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       ALTER TABLE CategoryOptionsTypes
       ADD is_strict bit
       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptionsTypes
      DROP COLUMN is_strict         `
      )
  }
};







