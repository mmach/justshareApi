import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { SearchItemDTO } from 'justshare-shared';
import uuidv4 from "uuid/v4";

/**
 *
 * @export
 * @class BlobRepository
 * @extends ItemRepository
 */
export default class ItemTransactionsRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof ItemRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ItemTransaction);
    this.sequelizeDI = sequelizeDI;
  }





  getItemTransaction({ iua_id, status_id, transaction }) {
    //  console.log('this.userId')
    //  console.log(this.userId)
    let userId = this.userId;

    let where = {

    }
    if (status_id == 0) {
      where = {
        status_id: status_id
      }
    } else {
      where = {
        iua_id: {
          [SequelizeDB.Sequelize.Op.in]: iua_id
        },
        project_id: this.context.project.id
      }
    }
    return this.entityDAO.findAll({
      where: where
      ,
      include: [
        {
          model: this.sequelizeDI.Category,
          required: true,
          as: "category",
          include: [
            {
              model: this.sequelizeDI.Blob,
              as: "icon_blob"

            }
          ]
        },
 
        {
          model: this.sequelizeDI.ItemTransactionCategoryOptions,
          required: true,
          as: "itemCategoryOption",

        },
        {
          model: this.sequelizeDI.V_User,
          attributes: ['id', 'name'],
          required: true,
          as: "user"

        },
        {
          model: this.sequelizeDI.Blob,
          as: "blobs",
          required: false,
          where: {
            status: this.sequelizeDI.sequelize.literal(`blobs.status = case when blobs.user_id='${userId ? userId : 0}' then blobs.status else 1 end`)
          },
          include: [
            { model: this.sequelizeDI.BlobMapper, as: "blob_thumbmail" },
            { model: this.sequelizeDI.BlobMapper, as: "blob_item" },
            { model: this.sequelizeDI.BlobMapper, as: "blob_min" }

          ]
        } //,
        // {
        //   model: this.sequelizeDI.CategoryHierarchy,
        //   as: "category_parent"
        // }
      ],
      transaction: this.getTran({ transaction })
    });
  }


}
