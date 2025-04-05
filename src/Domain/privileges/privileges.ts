'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { PrivilegesDBO } from "../../DBO/privileges";
/**
 * Interface for Privileges instance
 */
interface PrivilegesInstance extends Model<PrivilegesDBO>, PrivilegesDBO { }

/**
 * Privileges model initialization
 */
export class Privileges extends Model<PrivilegesInstance, PrivilegesDBO> {
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