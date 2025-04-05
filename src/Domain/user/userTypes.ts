'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { UserTypesDBO } from "../../DBO/user";

/**
 * Interface for UserTypes instance
 */
interface UserTypesInstance extends Model<UserTypesDBO>, UserTypesDBO { }

/**
 * UserTypes model initialization
 */
export class UserTypes extends Model<UserTypesInstance, UserTypesDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<UserTypes> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        blob_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'UserTypes'
      }
    );
  }

  static associate(models: any) {
    UserTypes.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
    UserTypes.belongsTo(models.Project, { as: "project", targetKey: 'id', foreignKey: "project_id" });
    UserTypes.hasMany(models.UserTypeRoles, { as: "usertype_roles", foreignKey: "usertype_id" });
    UserTypes.belongsTo(models.Blob, { as: "icon", targetKey: 'id', foreignKey: "blob_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    UserTypes.beforeDestroy(async (item: any, options) => {
      await models.UserTypeRoles.destroy({
        where: { usertype_id: item.dataValues.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });

    UserTypes.afterDestroy(async (item: any, options) => {
      await models.Translations.destroy({
        where: { id: item.dataValues.translation_id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.Blob.destroy({
        where: { id: item.dataValues.blob_id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}