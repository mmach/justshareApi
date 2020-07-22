
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      

        ALTER TABLE Projects
        ADD  salt nvarchar(36)  ;
`




      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      
     
      ALTER TABLE Projects
      DROP COLUMN  salt  


 `
      )
  }
};







