



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       ALTER TABLE ItemCategoryOptions
       ADD project_id char(36)

       ALTER TABLE [dbo].[ItemCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptions_Projects] FOREIGN KEY([project_id])
          REFERENCES [dbo].[Projects] ([id])

       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE ItemCategoryOptions
      DROP COLUMN project_id         `
      )
  }
};







