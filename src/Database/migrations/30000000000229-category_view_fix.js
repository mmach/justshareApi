

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER VIEW [dbo].[V_Categories] AS (
          SELECT [Categories].[id]
                ,Translations.name  [category]
                ,Translations.pl[category_pl]
                ,Translations.us [category_us]
                ,[Categories].[created_at]
                ,[Categories].[updated_at]
                ,[status]
                ,[forThing]
                ,[forSell]
                ,[forEvent]
                ,Translations.de [category_de]
                ,Translations.ru [category_ru]
                ,Translations.fr [category_fr]
                ,Translations.es [category_es]
                ,Translations.no [category_no]
                ,Translations.zh_cn [category_zh_cn]
                ,[expired_day]
                ,[blob_id]
                ,[Categories].[project_id]
                ,'' as [icon]
                ,[color]
                ,[translation_id]
                ,process_id 
                ,params 
                ,preview_desktop 
                ,preview_mobile
            FROM [dbo].[Categories]
            JOIN Translations ON translation_id =Translations .id AND [Categories].[project_id] =Translations.[project_id]
          )
  

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    

      ALTER VIEW [dbo].[V_Categories] AS (
        SELECT [Categories].[id]
              ,Translations.name  [category]
              ,Translations.pl[category_pl]
              ,Translations.us [category_us]
              ,[Categories].[created_at]
              ,[Categories].[updated_at]
              ,[status]
              ,[forThing]
              ,[forSell]
              ,[forEvent]
              ,Translations.de [category_de]
              ,Translations.ru [category_ru]
              ,Translations.fr [category_fr]
              ,Translations.es [category_es]
              ,Translations.no [category_no]
              ,Translations.zh_cn [category_zh_cn]
              ,[expired_day]
              ,[blob_id]
              ,[Categories].[project_id]
              ,'' as [icon]
              ,[color]
              ,[translation_id]
          FROM [dbo].[Categories]
          JOIN Translations ON translation_id =Translations .id AND [Categories].[project_id] =Translations.[project_id]
        )

 
   
           `
      )
  }
};







