
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Translations
        ADD project_id char(36)
          
        ALTER TABLE [dbo].[Translations]  WITH CHECK ADD  CONSTRAINT [FK_Translations_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id]) 

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE Translations
      DROP COLUMN project_id
        
         `      
 

 
      )
  }
};







