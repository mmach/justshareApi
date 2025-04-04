'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CategoryActionsDTO } from "../../../Models/category";


/**
 * Interface for CategoryActions instance
 */
export interface CategoryActionsInstance extends Model<CategoryActionsDTO>, CategoryActionsDTO {}

/**
 * CategoryActions model initialization
 */
export default class CategoryActions extends Model<CategoryActionsInstance, CategoryActionsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<CategoryActions> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        action_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'CategoryActions'
      }
    );
  }

  static associate(models: any) {
  }
}