"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE CategoryOptionsTemplates 
        ALTER COLUMN func nvarchar(max);
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE CategoryOptionsTemplates 
      ALTER COLUMN func nvarchar(100);

             `
      )
  }
};
