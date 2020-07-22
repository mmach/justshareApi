
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      

        ALTER   VIEW [dbo].[V_Projects] AS 
        SELECT  [id]
              ,[name]
              ,[project_id]
              ,[created_at]
              ,[updated_at]
              ,[categories_from_parent]
              ,[theme_color]
              ,[root_category_id]
              ,[item_to_parent]
              ,[logo_url]
              ,[status]
              ,[base_url]
              ,[contact_mail]
              ,[blob_logo_id]
              ,[blob_logo_hor_id]
              ,[blob_logo_ver_id]
              ,[blob_main_id]
              ,[blob_main_phone_id]
              ,[description]
              ,[user_id]
              ,[plan_id]
              ,[auth_url]
            ,[salt]
          FROM [DB_A43E8B_stuffshare].[dbo].[Projects]
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      
      ALTER   VIEW [dbo].[V_Projects] AS 
      SELECT  [id]
            ,[name]
            ,[project_id]
            ,[created_at]
            ,[updated_at]
            ,[categories_from_parent]
            ,[theme_color]
            ,[root_category_id]
            ,[item_to_parent]
            ,[logo_url]
            ,[status]
            ,[base_url]
            ,[contact_mail]
            ,[blob_logo_id]
            ,[blob_logo_hor_id]
            ,[blob_logo_ver_id]
            ,[blob_main_id]
            ,[blob_main_phone_id]
            ,[description]
            ,[user_id]
            ,[plan_id]
            ,[auth_url]
        FROM [DB_A43E8B_stuffshare].[dbo].[Projects]   

    


 `
      )
  }
};






