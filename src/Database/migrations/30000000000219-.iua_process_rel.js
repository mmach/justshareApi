

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      

      ALTER TABLE [ItemUserActions]
      ADD process_id char(36)

      ALTER TABLE [ItemUserActions]
      ADD process_chain_id char(36)
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [ItemUserActions]
      DROP COLUMN process_id 

      ALTER TABLE [ItemUserActions]
      DROP COLUMN process_chain_id 
   
           `
      )
  }
};







