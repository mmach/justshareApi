
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Country attributes
 */
export interface CountryDTO {
  id: string;
  name?: string;
  status?: string;
  uid?: string;
  name_clob?: string;
  name_clear?: string;
  longitude?: number;
  latitude?: number;
}

/**
 * Interface for Country instance
 */
export interface CountryInstance extends Model<CountryDTO>, CountryDTO {}

/**
 * Country model initialization
 */
export default class Country extends Model<CountryInstance, CountryDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Country> {
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
          allowNull: true
        },
        status: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        uid: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        name_clob: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        name_clear: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        longitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        latitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Countries'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}