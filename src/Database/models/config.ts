import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Config attributes
 */
export interface ConfigDTO {
  id: string;
  project_id?: string;
  type?: string;
  lang?: string;
  body?: string;
}

/**
 * Interface for Config instance
 */
export interface ConfigInstance extends Model<ConfigDTO>, ConfigDTO {}

/**
 * Config model initialization
 */
export default class Config extends Model<ConfigInstance, ConfigDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Config> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        lang: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Configs'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}