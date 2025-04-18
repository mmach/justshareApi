
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ItemTransactionDBO } from "../../DBO/item";

/**
 * Interface for ItemTransaction instance
 */
interface ItemTransactionInstance extends Model<ItemTransactionDBO>, ItemTransactionDBO {}

/**
 * ItemTransaction model initialization
 */
export class ItemTransaction extends Model<ItemTransactionInstance, ItemTransactionDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemTransaction> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(1024),
          allowNull: false
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        blob_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        parent_iua_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        longitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        latitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        category_type: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        expired_date: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        external_id: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'ItemTransactions'
      }
    );
  }

  static hooks(models: any) {
    // Define hooks here
  }

  static associate(models: any) {
    ItemTransaction.belongsTo(models.Category, {
      as: "category",
      targetKey: "id",
      foreignKey: "category_id"
    });
    ItemTransaction.belongsTo(models.Project, {
      as: "project",
      targetKey: "id",
      foreignKey: "project_id"
    });
    ItemTransaction.belongsTo(models.ItemUserAction, {
      as: "iua_main",
      targetKey: "id",
      foreignKey: "parent_iua_id"
    });
    ItemTransaction.belongsTo(models.Item, {
      as: "item",
      targetKey: "id",
      foreignKey: "item_id"
    });
    ItemTransaction.belongsTo(models.V_User, {
      as: "user",
      targetKey: "id",
      foreignKey: "user_id"
    });
    ItemTransaction.hasMany(models.ItemTransactionCategoryOptions, {
      as: "itemCategoryOption",
      foreignKey: "itemTransaction_id"
    });
    ItemTransaction.belongsToMany(models.Tag, {
      through: { model: models.ItemTag },
      as: 'tags',
      targetKey: 'id',
      foreignKey: "item_id"
    });
  }
}