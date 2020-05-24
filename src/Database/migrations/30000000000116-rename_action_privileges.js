
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        EXEC sp_rename 'ActionsProject', 'ActionsProjects'
      
       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      EXEC sp_rename 'ActionsProjects', 'ActionsProject'
      
 

 `
      )
  }
};







