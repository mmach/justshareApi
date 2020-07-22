"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
           ALTER TABLE Dimensions
           ADD cott_id char(36)


          ALTER TABLE [dbo].[Dimensions]  WITH CHECK ADD  CONSTRAINT [FK_Dimensions_CategoryOptionsTypeTemplates] FOREIGN KEY([cott_id])
          REFERENCES [dbo].[CategoryOptionsTypeTemplates] ([id])
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            ALTER TABLE Dimensions
            DROP COLUMN cott_id


          ALTER TABLE [dbo].[Dimensions]  DROP  CONSTRAINT [FK_Dimensions_CategoryOptionsTypeTemplates] 

            
        

             `
      )
  }
};
