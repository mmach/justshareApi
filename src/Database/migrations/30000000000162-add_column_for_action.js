"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
              
        ALTER TABLE ItemCategoryOptions 
        ADD  status char(3)

        
        ALTER TABLE ItemCategoryOptions 
        ADD  iua_id char(36)

   
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          
            ALTER TABLE ItemCategoryOptions 
            DROP COLUMN status

            
            ALTER TABLE ItemCategoryOptions 
            DROP COLUMN iua_id 
        

             `
      )
  }
};
