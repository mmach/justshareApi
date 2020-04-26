"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TRIGGER [dbo].[Blobs_DeleteTrigger]
        ON [dbo].[Blobs]
        FOR DELETE
        AS
       UPDATE 
        Users 
       SET blob_id=NULL
       WHERE blob_id IN (SELECT deleted.id from deleted  )
  
     UPDATE 
        Items 
       SET blob_id=NULL
       WHERE blob_id IN (SELECT deleted.id from deleted  )
       ;
  
   UPDATE 
        Categories
       SET blob_id=NULL
       WHERE blob_id IN (SELECT deleted.id from deleted  )
       ;
    DELETE FROM BlobMappers WHERE 
    id IN ( select deleted.blob_id from deleted
      UNION
    SELECT deleted.blob_thumbmail_id from deleted
    UNION
    SELECT deleted.blob_min_id from deleted);


   
DROP TRIGGER [dbo].[TRG_AUD_DEL]


        
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TRIGGER [dbo].[Blobs_DeleteTrigger]
      ON [dbo].[Blobs]
      FOR DELETE
      AS
     UPDATE 
      Users 
     SET blob_id=NULL
     WHERE blob_id IN (SELECT deleted.id from deleted  )

   UPDATE 
      Items 
     SET blob_id=NULL
     WHERE blob_id IN (SELECT deleted.id from deleted  )
     ;

 
  DELETE FROM BlobMappers WHERE 
  id IN ( select deleted.blob_id from deleted
    UNION
  SELECT deleted.blob_thumbmail_id from deleted
  UNION
  SELECT deleted.blob_min_id from deleted)`
      )
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
