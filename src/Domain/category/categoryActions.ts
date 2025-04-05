'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CategoryActionsDBO } from "../../DBO/category";


/**
 * Interface for CategoryActions instance
 */
interface CategoryActionsInstance extends Model<CategoryActionsDBO>, CategoryActionsDBO {}

/**
 * CategoryActions model initialization
 */
export class CategoryActions extends Model<CategoryActionsInstance, CategoryActionsDBO> {
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