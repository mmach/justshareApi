



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       ALTER TABLE CategoryOptionsTemplates
       ADD value_translation_id char(36)

       ALTER TABLE [dbo].[CategoryOptionsTemplates]  WITH CHECK ADD  CONSTRAINT [FK_CategoryOptionsTemplates_Translations] FOREIGN KEY([value_translation_id])
          REFERENCES [dbo].[Translations] ([id])

       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptionsTemplates
      DROP COLUMN value_translation_id         `
      )
  }
};







