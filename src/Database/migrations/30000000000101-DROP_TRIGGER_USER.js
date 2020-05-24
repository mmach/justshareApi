"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        DROP TRIGGER [dbo].[TRG_AUD_DEL]




       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      CREATE TRIGGER [dbo].[TRG_AUD_DEL]
      ON [dbo].[Users]
      FOR DELETE
      AS
        Delete i from Items i
        JOIN DELETED  d ON i.user_id = d.id
  
           DELETE b FROM Blobs  b 
         JOIN DELETED  d ON b.user_id = d.id;

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
