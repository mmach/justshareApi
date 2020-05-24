
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        EXEC sp_rename 'Language', 'Languages'
      
       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      EXEC sp_rename 'Languages', 'Language'
      
 

 `
      )
  }
};







