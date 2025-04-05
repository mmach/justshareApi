'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

import { RolesDBO } from "../../DBO/roles";
/**
 * Interface for Roles instance
 */
interface RolesInstance extends Model<RolesDBO>, RolesDBO { }

/**
 * Roles model initialization
 */
export class Roles extends Model<RolesInstance, RolesDBO> {
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