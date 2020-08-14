'use strict';
module.exports = {
  up: (migration, Sequelize) => {
    return migration.sequelize.query(`
                                --  CREATE TABLE [dbo].[BlobStore] AS FILETABLE ON [PRIMARY] FILESTREAM_ON [BlobStoreFS]
                                 --     WITH
                                --      (
                                --      FILETABLE_DIRECTORY = N'BlobStoreFS', FILETABLE_COLLATE_FILENAME = Polish_CI_AS
                                --      )

                                CREATE TABLE [dbo].[BlobStore](
                                  [stream_id] [char](36) NOT NULL,
                                  [file_stream] [varbinary](max) NULL,
                                  [name] [varchar](255) NULL,
                                  [file_type] [nvarchar](255) NULL,
                                  [cached_file_size] [bigint] NULL,
                                  [creation_time] [datetimeoffset](7) NULL,
                                 CONSTRAINT [PK_BlobStore] PRIMARY KEY CLUSTERED 
                                (
                                  [stream_id] ASC
                                )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
                                ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
                                  
    `);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlobStore');
  }
};