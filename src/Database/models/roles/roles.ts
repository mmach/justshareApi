'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Roles attributes
 */
export interface RolesDTO {
  id: string;
  name?: string;
  status?: boolean;
  description?: string;
  project_id?: string;
}

/**
 * Interface for Roles instance
 */
export interface RolesInstance extends Model<RolesDTO>, RolesDTO { }

/**
 * Roles model initialization
 */
export default class Roles extends Model<RolesInstance, RolesDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Roles> {
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
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Roles'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    Roles.beforeDestroy(async (item: any, options) => {
      await models.RolesProject.destroy({
        where: { role_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }

  static associate(models: any) {
    // Define associations here
  }
}