import fs from 'fs';
import { QueryTypes, Sequelize } from "sequelize";
import { BaseRepositoryType } from '../../../Architecture';
import { BlobDBO } from '../../../DBO/index';
import { Blob } from '../../../Domain/index';
import { IMappsDbModels } from "../../../Domain/models";
import { IBlobRepository } from '../blobRepository';
export default class BlobRepository extends BaseRepositoryType<BlobDBO, Blob> implements IBlobRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize };

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.Blob);
    this.sequelizeDI = sequelizeDI;
  }

  getByGuids({ ids, transaction }: { ids: string[], transaction?: number }): Promise<object[]> {
    return this.sequelizeDI.sequelize.query(
      `
        select blob,type,id
        from openjson(
            (	SELECT blobs.* FROM (
                select TOP ${ids.length} file_stream as blob,file_type as type, BlobMappers.id
                from BlobStore
                JOIN BlobMappers ON BlobMappers.stream_id = BlobStore.stream_id
                WHERE id IN (:ids)
               ) as blobs
                for json auto
            )
        ) with(blob varchar(max),type varchar(10), id varchar(100))
    `,
      {
        replacements: { ids: ids },
        transaction: this.getTran({ transaction }) as any,
        type: QueryTypes.SELECT
      }
    );

  }

  getProjectsItemsStorage({ transaction }: { transaction?: number }): Promise<Blob[]> {
    return this.entityDAO.findAll({
      where: {
        project_id: this.context.project.id,
        item_id: this.sequelizeDI.sequelize.literal(`item_id IS NOT NULL`),
        category_id: null
      },
      include: [
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_item",
          required: true
        },
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_min",
          required: true
        }
      ],
      transaction: this.getTran({ transaction }) as any
    })
  }

  getProjectsCategoriesStorage({ transaction }: { transaction?: number }): Promise<Blob[]> {
    return this.entityDAO.findAll({
      where: {
        project_id: this.context.project.id,
        category_id: this.sequelizeDI.sequelize.literal(`category_id IS NOT NULL`),
      },
      include: [
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_item",
          required: true
        },
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_min",
          required: true
        }
      ],
      transaction: this.getTran({ transaction }) as any
    })
  }
  getProjectsUsersStorage({ transaction }: { transaction?: number }): Promise<Blob[]> {
    return this.entityDAO.findAll({
      where: {
        project_id: this.context.project.id,
        user_id: this.sequelizeDI.sequelize.literal(`user_id IS NOT NULL`),
        item_id: null,
        category_id: null
      },
      include: [
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_item",
          required: true
        },
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_min",
          required: true
        }
      ],
      transaction: this.getTran({ transaction })
    })
  }

  getProjectsStorage({ transaction }: { transaction?: number }): Promise<Blob[]> {
    return this.entityDAO.findAll({
      where: {
        project_id: this.context.project.id,
        item_id: null,
        user_id: null,
        category_id: null
      },
      include: [
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_item",
          required: true
        },
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_min",
          required: true
        }
      ],
      transaction: this.getTran({ transaction })
    })
  }

  insertFile({ id, path, name, transaction }: { id: string, path: string, name: string, transaction?: number }): Promise<object[]> {
    var blob = fs.readFileSync(path);
    let file_type = name.split('.')[name.split('.').length - 1]
    //let size = stringToBytesFaster(blob.toString('base64')).length;
    const base64Size = (base64String: string): number => {
      const padding = (base64String.match(/=/g) || []).length;
      const base64Length = base64String.length;
      return (base64Length * 3) / 4 - padding;
    };
    let size = base64Size(blob.toString('base64'));
    return this.sequelizeDI.sequelize.query(
      `SET NOCOUNT ON
        DECLARE @result TABLE 
        (
         stream_id nvarchar(50)
        )
        DECLARE @file varbinary(max);
        SET @file = (select blob
        from openjson(
            (	SELECT blobs.* FROM (
                select :blob as blob
               ) as blobs
                for json auto
            )
        ) with(blob varbinary(max)))

        INSERT INTO [BlobStore](stream_id,[file_stream], [name],file_type,cached_file_size,creation_time) 
        OUTPUT 
         CONVERT(nvarchar(50),inserted.stream_id)
         INTO @result
        Values (
          :id
          ,@file
         ,:name
         ,:file_type
        ,:size,
        GETDATE()
         )
         
        INSERT INTO dbo.BlobMappers
         (id, stream_id,created_at,updated_at)    
         SELECT :id , stream_id,GETDATE(),GETDATE()
         FROM @result;   
        DELETE @result   
        SET NOCOUNT OFF
        SELECT TOP 1 id,id  FROM BlobMappers
        WHERE id = :id
        SET NOCOUNT ON`,
      {
        logging: false,
        replacements: { blob: blob, id: id, name: name, file_type: file_type, size: size },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT,

      }
    );


  }
  getBlobs({ userId, itemId, transaction }: { userId: string | null | undefined, itemId: string | null | undefined, transaction?: number }): Promise<Blob[]> {
    return this.entityDAO.findAll({
      where: {
        user_id: this.toStr(userId),
        item_id: this.toStr(itemId),
        status: (this.userId == userId ? [1, 0] : 1)
      },
      include: [
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_item",
          required: true
        },
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_thumbmail",
          required: true
        }
      ],
      transaction: this.getTran({ transaction })
    })
  }

  getUnverified({
    transaction
  }: { transaction?: number }): Promise<Blob[]> {
    return this.entityDAO.findAll({
      where: {
        status: 0
      },
      include: [
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_item",
          required: true
        },
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_thumbmail",
          required: true
        }
      ],
      transaction: this.getTran({ transaction })
    })
  }

  verifyImage({
    blob, transaction
  }: { blob: BlobDBO, transaction?: number }): Promise<[affectedCount: number]> {
    return this.entityDAO.update(
      {
        status: 1
      },
      {
        where: { id: this.toStr(blob.id) },
        transaction: this.getTran({ transaction }),
        individualHooks: true

      }
    );
  }
  getBlobsCategory({
    category_id, transaction
  }: { category_id: string, transaction?: number }): Promise<Blob[]> {
    return this.entityDAO.findAll(
      {
        where: { category_id: this.toStr(category_id) },
        transaction: this.getTran({ transaction })
      }
    );
  }

}

export const BlobRepositoryPlugin = {
  pluginName: "blob-repository",
  type: 'repository',
  di: 'blobRepositoryDI',
  classType: BlobRepository
};