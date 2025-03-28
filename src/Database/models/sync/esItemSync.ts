
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for EsItemSync attributes
 */
export interface EsItemSyncDTO {
  id: string;
  item_id?: string;
  project_id?: string;
  operation?: string;
}

/**
 * Interface for EsItemSync instance
 */
export interface EsItemSyncInstance extends Model<EsItemSyncDTO>, EsItemSyncDTO {}

/**
 * EsItemSync model initialization
 */
export default class EsItemSync extends Model<EsItemSyncInstance, EsItemSyncDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<EsItemSync> {
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
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        operation: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'EsItemSyncs'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}