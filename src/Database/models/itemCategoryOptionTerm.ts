
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for ItemCategoryOptionTerm attributes
 */
export interface ItemCategoryOptionTermDTO {
  id: string;
  item_id?: string;
  col_id?: string;
  co_temp_id?: string;
  start_date?: Date;
  project_id?: string;
  end_date?: Date;
  iua_id?: string;
  dim_id?: string;
  co_id?: string;
}

/**
 * Interface for ItemCategoryOptionTerm instance
 */
export interface ItemCategoryOptionTermInstance extends Model<ItemCategoryOptionTermDTO>, ItemCategoryOptionTermDTO {}

/**
 * ItemCategoryOptionTerm model initialization
 */
export default class ItemCategoryOptionTerm extends Model<ItemCategoryOptionTermInstance, ItemCategoryOptionTermDTO> {
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