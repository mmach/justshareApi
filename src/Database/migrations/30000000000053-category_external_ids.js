"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE [dbo].[CategoryExternals]
         DROP COLUMN external_name;

         ALTER TABLE [dbo].[CategoryExternals]
          ADD external_id nvarchar(300);

          ALTER TABLE [dbo].[CategoryExternals]
            ADD  source_id char(36);     
      
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
   
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
