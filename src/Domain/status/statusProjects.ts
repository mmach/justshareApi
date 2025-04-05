'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { StatusProjectsDBO } from "../../DBO/status";

/**
 * Interface for StatusProjects instance
 */
interface StatusProjectsInstance extends Model<StatusProjectsDBO>, StatusProjectsDBO { }

/**
 * StatusProjects model initialization
 */
export class StatusProjects extends Model<StatusProjectsInstance, StatusProjectsDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<StatusProjects> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        is_closed: {
          type: DataTypes.UUID,
          allowNull: true
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status_order: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'StatusProjects'
      }
    );
  }

  static associate(models: any) {
    StatusProjects.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
    StatusProjects.belongsTo(models.Status, { as: "status", targetKey: 'id', foreignKey: "status_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    StatusProjects.afterDestroy(async (item: any, options) => {
      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}