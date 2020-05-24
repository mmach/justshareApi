
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        EXEC sp_rename 'RolesProject', 'RolesProjects'
      
       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      EXEC sp_rename 'RolesProjects', 'RolesProject'
      
 

 `
      )
  }
};







