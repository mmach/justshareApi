

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
    CREATE TABLE dbo.ItemCategoryOptionTerms(
      [id] [char](36) PRIMARY KEY,
      item_id char(36),
      iua_id char(36),
      start_date [datetimeoffset](7),
      end_date [datetimeoffset](7),
      dim_id char(36),
      col_id char(36),
      project_id char(36),
      co_temp_id chaR(36),
      co_id chaR(36),

      [created_at] [datetimeoffset](7) NOT NULL,
      [updated_at] [datetimeoffset](7) NOT NULL
    ) ON [PRIMARY]   

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     DROP TABLE ItemCategoryOptionTerms

        
    
        `
      )
  }
};







