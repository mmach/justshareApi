



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       ALTER TABLE CategoryOptions
       ADD translation_id char(36)

       ALTER TABLE [dbo].[CategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_CategoryOptions_Translations] FOREIGN KEY([translation_id])
          REFERENCES [dbo].[Translations] ([id])

       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptions
      DROP COLUMN translation_id         `
      )
  }
};







