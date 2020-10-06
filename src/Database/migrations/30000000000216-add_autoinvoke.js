

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      

ALTER TABLE [ProcessChains]
ADD autorun bit
      
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [ProcessChains]
      drop column autorun
    

           `
      )
  }
};







