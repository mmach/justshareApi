"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER VIEW [dbo].[V_Users] AS
        SELECT [id]
              ,[name]
              ,[surname]
              ,[email]
              ,[phone]
              ,[birthDate]  
              ,[longitude]
              ,[latitude]
              ,[created_at]
              ,[updated_at]
              ,[relogin_require]
              ,[language]
              ,blob_id
              ,is_root
              ,is_admin
              ,zipcode 
              ,address 
              ,city_id 
              ,country_id
              ,city
              ,project_id
          FROM [dbo].[Users]
          WHERE is_authorized=1



       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER VIEW [dbo].[V_Users] AS
      SELECT [id]
            ,[name]
            ,[surname]
            ,[email]
            ,[phone]
            ,[birthDate]  
            ,[longitude]
            ,[latitude]
            ,[created_at]
            ,[updated_at]
            ,[relogin_require]
            ,[language]
            ,blob_id
            ,is_root
            ,is_admin
            ,zipcode 
            ,address 
            ,city_id 
            ,country_id
            ,city
            
        FROM [dbo].[Users]
        WHERE is_authorized=1
 

 `
      )
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
