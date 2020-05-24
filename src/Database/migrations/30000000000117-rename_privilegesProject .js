
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        EXEC sp_rename 'PrivilegesProject', 'PrivilegesProjects'
      
       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      EXEC sp_rename 'PrivilegesProjects', 'PrivilegesProject'
      
 

 `
      )
  }
};







