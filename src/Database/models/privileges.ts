'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Privileges attributes
 */
export interface PrivilegesDTO {
  id: string;
  name?: string;
  status?: boolean;
  project_id?: string;
}

/**
 * Interface for Privileges instance
 */
export interface PrivilegesInstance extends Model<PrivilegesDTO>, PrivilegesDTO { }

/**
 * Privileges model initialization
 */
export default class Privileges extends Model<PrivilegesInstance, PrivilegesDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Privileges> {
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
          type: DataTypes.BOOLEAN
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Privileges'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }

  static hooks(models: any, sequelize: Sequelize) {
    Privileges.beforeDestroy(async (item: any, options) => {
      await models.PrivilegesProject.destroy({
        where: { privilege_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}