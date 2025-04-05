
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ItemCategoryOptionTermDBO } from "../../DBO/item";
/**
 * Interface for ItemCategoryOptionTerm instance
 */
interface ItemCategoryOptionTermInstance extends Model<ItemCategoryOptionTermDBO>, ItemCategoryOptionTermDBO {}

/**
 * ItemCategoryOptionTerm model initialization
 */
export class ItemCategoryOptionTerm extends Model<ItemCategoryOptionTermInstance, ItemCategoryOptionTermDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemCategoryOptionTerm> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        col_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        co_temp_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        start_date: {
          type: DataTypes.DATE,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        end_date: {
          type: DataTypes.DATE,
          allowNull: true
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        dim_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        co_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'ItemCategoryOptionTerms'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}