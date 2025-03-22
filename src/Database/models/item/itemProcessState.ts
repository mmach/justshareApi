
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for ItemProcessState attributes
 */
export interface ItemProcessStateDTO {
  id: string;
  item_id?: string;
  project_id?: string;
  user_id?: string;
  process_id?: string;
  process_chain_id?: string;
  step_order?: number;
}

/**
 * Interface for ItemProcessState instance
 */
export interface ItemProcessStateInstance extends Model<ItemProcessStateDTO>, ItemProcessStateDTO {}

/**
 * ItemProcessState model initialization
 */
export default class ItemProcessState extends Model<ItemProcessStateInstance, ItemProcessStateDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemProcessState> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        item_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        process_chain_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        step_order: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      { 
        sequelize,
        tableName: 'ItemProcessStates'
      }
    );
  }

  static hooks(models: any) {
    // Define hooks here
  }

  static associate(models: any) {
    // Define associations here
  }
}