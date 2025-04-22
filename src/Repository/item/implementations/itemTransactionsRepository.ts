import { Sequelize, QueryTypes, Op } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { ItemTransactionDBO } from "../../../DBO";
import { ItemTransaction } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IItemTransactionsRepository } from "../itemTransactionsRepository";

export default class ItemTransactionsRepository extends BaseRepositoryType<ItemTransactionDBO, ItemTransaction> implements IItemTransactionsRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize };

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.ItemTransaction);
    this.sequelizeDI = sequelizeDI;
  }

  getRootIuaIds({ iua_ids, transaction }: { iua_ids: string[], transaction?: number }): Promise<object[]> {
    return this.sequelizeDI.sequelize.query(
      `
    WITH recus(iua_id, iua_grouping, step) AS (
      SELECT ISNULL(parent_iua_id,iua_id), iua_id, 1 FROM ItemTransactions
        WHERE iua_id IN (:id)
          AND  ItemTransactions.project_id = :project_id
      UNION ALL
      SELECT  ItemTransactions.parent_iua_id, iua_grouping, step+1 FROM recus JOIN ItemTransactions ON ItemTransactions.iua_id = recus.iua_id
        WHERE ItemTransactions.iua_id != ItemTransactions.parent_iua_id AND ItemTransactions.parent_iua_id IS NOT NULL
      ),
      union_recus AS (
        SELECT iua_id,iua_grouping,step, MAX(step) OVER(PARTITION BY iua_grouping) as max_step FROM recus 
      )
      SELECT iua_id FROM union_recus 
        WHERE max_step=step  `,
      {
        replacements: { id: iua_ids.length > 0 ? iua_ids : [''], project_id: this.context.project.id },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      }
    );
  }

  getAllChildrenIUA({ iua_ids, transaction }: { iua_ids: string[], transaction?: number }): Promise<{ iua_id: string, iua_grouping: string, step: number }[]> {
    return this.sequelizeDI.sequelize.query(
      `
        WITH recus(iua_id,iua_grouping,step) AS (
          SELECT id,parent_iua_id,1 FROM ItemUserActions
          WHERE parent_iua_id IN (:id)AND ItemUserActions.iua_id IS NULL AND  ItemTransactions.project_id=:project_id
          UNION ALL
          SELECT ItemUserActions.id,iua_grouping,step+1 FROM recus JOIN ItemUserActions ON ItemUserActions.parent_iua_id=recus.iua_id
        AND ItemUserActions.iua_id IS NULL
          ),
          union_recus AS (
        SELECT recus.iua_id,iua_grouping,step FROM recus
        --JOIN ItemUserActions ON ItemUserActions.id=recus.iua_id
          )
          SELECT * FROM union_recus 
      ORDER BY iua_grouping, step asc
`,
      {
        replacements: { id: iua_ids.length > 0 ? iua_ids : [''], project_id: this.context.project.id },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      }
    );
  }

  getFromRootIuaAllIuaIds({ iua_ids, transaction }: { iua_ids: string[], transaction?: number }): Promise<{ iua_id: string, root_iua_id: string, step: number }[]> {
    return this.sequelizeDI.sequelize.query(
      `
      WITH recus(iua_id,root_iua_id,step) AS (
        SELECT iua_id,parent_iua_id,1 FROM ItemTransactions
        WHERE parent_iua_id IN (:id) AND iua_id!=parent_iua_id AND  ItemTransactions.project_id=:project_id
        UNION ALL
        SELECT ItemTransactions.parent_iua_id,root_iua_id,step+1 FROM recus JOIN ItemTransactions ON ItemTransactions.parent_iua_id=recus.iua_id
    WHERE ItemTransactions.iua_id!=ItemTransactions.parent_iua_id
        ),
        union_recus AS (
      SELECT recus.iua_id,root_iua_id,step FROM recus
      UNION ALL
      SELECT id,id,0 FROM ItemUserActions
      WHERE id in (:id)
        )
        SELECT * FROM union_recus 
    ORDER BY root_iua_id, step asc
  `,
      {
        replacements: { id: iua_ids.length > 0 ? iua_ids : [''], project_id: this.context.project.id },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      }
    );
  }


  getItemTransaction({ iua_id, status_id, transaction }: { iua_id: string[], status_id: number, transaction?: number }): Promise<ItemTransaction[]> {
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
          [Op.in]: iua_id
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
          include: [
            {
              model: this.sequelizeDI.CategoryOptionsLink, as: "category_link", required: true,
              include: [
                {
                  model: this.sequelizeDI.CategoryOption, as: "catOption",
                  required: true,
                  include: [
                    {
                      model: this.sequelizeDI.CategoryOptionsType,
                      as: "cat_opt",
                      required: false,
                      where: {
                        status: 1
                      }
                    }
                  ]
                }
              ]
            },
            {
              model: this.sequelizeDI.CategoryOptionsTemplate, as: "cat_opt_temp", required: true,
              include: [{
                model: this.sequelizeDI.CategoryOptionsTypeTemplate,
                required: true,
                as: "cat_opt_type_template"
              }
              ]
            }
          ]
        },

        {
          model: this.sequelizeDI.V_User,
          attributes: ['id', 'name'],
          required: true,
          as: "user"

        },
        {
          model: this.sequelizeDI.Item,
          as: "item",
          required: false,

          include: [
            {
              model: this.sequelizeDI.Blob,
              as: "blobs",
              required: false,

              include: [
                { model: this.sequelizeDI.BlobMapper, as: "blob_thumbmail" },
                { model: this.sequelizeDI.BlobMapper, as: "blob_item" },
                { model: this.sequelizeDI.BlobMapper, as: "blob_min" }

              ]
            }
          ]
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }


}

export const ItemTransactionsRepositoryPlugin = {
  pluginName: "item-transactions-repository",
  type: 'repository',
  di: 'itemTransactionRepositoryDI',
  classType: ItemTransactionsRepository,
};