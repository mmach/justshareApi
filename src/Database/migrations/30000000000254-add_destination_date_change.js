



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE ItemUserActions
          ADD destination_date datetimeoffset(7)
        
       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE ItemUserActions
        DROP COLUMN destination_date

     
        `
      )
  }
};







