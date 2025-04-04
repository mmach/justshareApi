"use strict";
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { CityDTO } from "../../../Models/location";
/**
 * Interface for City instance
 */
export interface CityInstance extends Model<CityDTO>, CityDTO { }

/**
 * City model initialization
 */
export default class City extends Model<CityInstance, CityDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<City> {
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
        country_id: {
          type: DataTypes.UUID,
          allowNull: false
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
        },
        population: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Cities'
      }
    );
  }

  static associate(models: any) {
  }
}
