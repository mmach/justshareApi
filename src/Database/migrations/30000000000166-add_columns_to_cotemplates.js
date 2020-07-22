"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
           ALTER TABLE CategoryOptionsTemplates
           ADD is_visible_form bit

                  
           ALTER TABLE CategoryOptionsTemplates
           ADD is_visible_search bit

           ALTER TABLE CategoryOptionsTemplates
           ADD dim_ref_Id char(36)
       
           ALTER TABLE Dimensions
           ADD as_cat_ref bit
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE CategoryOptionsTemplates
      DROP COLUMN is_visible_form 

             
      ALTER TABLE CategoryOptionsTemplates
      DROP COLUMN is_visible_search 

      ALTER TABLE CategoryOptionsTemplates
      DROP COLUMN dim_ref_Id 
     
      ALTER TABLE Dimensions
      DROP COLUMN as_cat_ref
 

             `
      )
  }
};
