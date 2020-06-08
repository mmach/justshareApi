"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Categories]
        ADD color nvarchar(20)


        ALTER TABLE [dbo].[Categories]
        ADD translation_id char(36)
        

        ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_Translations] FOREIGN KEY([translation_id])
        REFERENCES [dbo].[Translations] ([id])
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[Categories]  DROP  CONSTRAINT [FK_Categories_Translations]

      ALTER TABLE [dbo].[Categories]
      DROP COLUMN color 

      ALTER TABLE [dbo].[Categories]
      DROP COLUMN translation_id 
            `
      )
  }
};
