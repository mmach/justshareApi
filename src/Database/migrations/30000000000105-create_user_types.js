"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE UserTypes(
          id char(36) PRIMARY KEY,
          name nvarchar(150) ,
          translation_id char(36) ,
          project_id char(36)
               ) ON [PRIMARY]   
   
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
  
    DROP TABLE UserTypes

     
 `
      )
  }
};



