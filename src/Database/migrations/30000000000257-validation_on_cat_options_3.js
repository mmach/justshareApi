



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptionsTemplates
        ADD thousand_separator char(1)

        ALTER TABLE CategoryOptionsTemplates
        ADD mask char(300)

        ALTER TABLE CategoryOptionsTemplates
        ADD allow_negative bit

        ALTER TABLE CategoryOptionsTemplates
        ADD allow_empty_formatting bit
      
        ALTER TABLE CategoryOptionsTemplates
          ADD allow_leading_zeros bit
        
        ALTER TABLE CategoryOptionsTemplates
        ADD decimal_separator varchar(10)
        
        ALTER TABLE CategoryOptionsTemplates
        ADD decimal_scale int
       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN thousand_separator 

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN mask

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN allow_negative 

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN allow_empty_formatting 
      
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN allow_leading_zeros 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN decimal_separator 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN decimal_scale 
        `
      )
  }
};







