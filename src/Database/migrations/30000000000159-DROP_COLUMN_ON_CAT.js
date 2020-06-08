"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        DROP  VIEW [dbo].[V_Categories_FT] 

        
        ALTER TABLE Categories
        DROP COLUMN category
        
        ALTER TABLE Categories
        DROP COLUMN [category_pl]
        ALTER TABLE Categories
        DROP COLUMN [category_us]

        ALTER TABLE Categories
        DROP COLUMN [category_de]

        ALTER TABLE Categories
        DROP COLUMN [category_ru]

        ALTER TABLE Categories
        DROP COLUMN [category_fr]

        ALTER TABLE Categories
        DROP COLUMN [category_es]

        ALTER TABLE Categories
        DROP COLUMN[category_no]

        
        ALTER TABLE Categories
        DROP COLUMN [category_zh_cn]
          
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      
      ALTER TABLE Categories
      ADD  category nvarchar(255)
      
      ALTER TABLE Categories
      ADD  [category_pl] nvarchar(255)
      ALTER TABLE Categories
      ADD  [category_us] nvarchar(255)

      ALTER TABLE Categories
      ADD  [category_de] nvarchar(255)

      ALTER TABLE Categories
      ADD  [category_ru] nvarchar(255)

      ALTER TABLE Categories
      ADD  [category_fr] nvarchar(255)

      ALTER TABLE Categories
      ADD  [category_es] nvarchar(255)

      ALTER TABLE Categories
      ADD [category_no] nvarchar(255)

      
      ALTER TABLE Categories
      ADD  [category_zh_cn]nvarchar(255);


             `
      ).then(succ => {
        return queryInterface.sequelize
          .query(`
        
        CREATE VIEW [dbo].[V_Categories_FT] 
        WITH SCHEMABINDING
        AS (
        SELECT [id]
              ,[category]
              ,ISNULL([category_pl],category) as [category_pl]
              ,ISNULL(category_us,category) as category_us
              ,ISNULL(category_de,category) as category_de
              ,ISNULL(category_ru,category) as category_ru
              ,ISNULL(category_fr,category) as category_fr
              ,ISNULL(category_es,category) as category_es
              ,ISNULL(category_no,category) as category_no
              ,ISNULL(category_zh_cn,category) as category_zh_cn
  
              ,[status]
          FROM [dbo].[Categories]
          WHERE status = 1
          )            `
          )
      })
  }
};
