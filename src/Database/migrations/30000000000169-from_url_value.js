"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE CategoryOptions 
        ADD  order_search int;

        ALTER TABLE CategoryOptionsTemplates 
        ADD  is_from_url bit;

        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE CategoryOptions 
      DROP COLUMN  order_search;

      ALTER TABLE CategoryOptionsTemplates 
      DROP COLUMN  is_from_url;
             `
      )
  }
};
