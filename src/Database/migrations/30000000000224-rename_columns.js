

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      
 
        EXEC sp_rename 'Projects.secretKey', 'secret_key', 'COLUMN';
        EXEC sp_rename 'Translations.respStatus', 'resp_status', 'COLUMN';
        EXEC sp_rename 'Users.birthDate', 'birth_date', 'COLUMN';
        EXEC sp_rename 'Users.passwordHash', 'password_hash', 'COLUMN';



      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
        EXEC sp_rename 'Projects.secret_key', 'secretKey', 'COLUMN';
        EXEC sp_rename 'Translations.resp_status', 'respStatus', 'COLUMN';
        EXEC sp_rename 'Users.birth_date', 'birthDate', 'COLUMN';
        EXEC sp_rename 'Users.password_hash', 'passwordHash', 'COLUMN';

   
           `
      )
  }
};







