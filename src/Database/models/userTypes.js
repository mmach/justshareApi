'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class UserTypes extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {UserAuths|Model}
   * @memberof UserAuths
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: sequelize.UUIDV4

        },
        translation_id: DataTypes.UUID,
        project_id: DataTypes.UUID,
        blob_id: DataTypes.UUID,

        name: DataTypes.STRING
      },
      { sequelize ,
        tableName: 'UserTypes'
      }
    );
  }
  static associate(models) {
    UserTypes.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
    UserTypes.belongsTo(models.Project, { as: "project", targetKey: 'id', foreignKey: "project_id" });
    UserTypes.hasMany(models.UserTypeRoles, { as: "usertype_roles", targetKey: 'id', foreignKey: "usertype_id" });
    UserTypes.belongsTo(models.Blob, { as: "icon", targetKey: 'id', foreignKey: "blob_id" });
    // Users.hasMany(models.UserAuth)
  }
  static hooks(models, sequelize) {

    UserTypes.afterDestroy(async (item, options) => {
      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      })
      await models.Blob.destroy({
        where: { id: item.blob_id },
        transaction: options.transaction,
        individualHooks: true
      })
    })
  }
}

/*
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    salt: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    uid: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4
    },
    is_authorized: DataTypes.BOOLEAN,
    passwordHash: DataTypes.STRING,
    city: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    adress: DataTypes.STRING,
    country: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    relogin_require:DataTypes.BOOLEAN,
    refresh_token:  DataTypes.UUID

  }, {underscored: true});
  User.associate = function (models) {
    //User.hasMany(models.Item);
    User.hasMany(models.UserAuth)
    // associations can be defined here
  };
  return User;
};
*/
