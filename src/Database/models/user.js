"use strict";
import Sequelize from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class Users extends Sequelize.Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Users|Model}
   * @memberof Users
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
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: true
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        salt: DataTypes.STRING,
        phone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        uid: {
          type: DataTypes.UUID,
          defaultValue: sequelize.UUIDV4
        },
        is_authorized: DataTypes.BOOLEAN,
        passwordHash: DataTypes.STRING,

        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        relogin_require: DataTypes.BOOLEAN,
        refresh_token: DataTypes.UUID,
        language: DataTypes.STRING,
        blob_id: DataTypes.UUID,
        is_admin: DataTypes.BOOLEAN,
        is_root: DataTypes.BOOLEAN,
        zipcode: DataTypes.STRING,
        address: DataTypes.STRING,
        city_id: DataTypes.UUID,
        country_id: DataTypes.UUID,
        city: DataTypes.STRING,
        project_id: DataTypes.UUID,
        usertype_id: DataTypes.UUID,
        user_invoice_data_id: DataTypes.UUID

      },
      { sequelize }
    );
  }

  static hooks(models, sequelize) {

    Users.beforeDestroy(async (item, options) => {

      console.log('beforeDestroyUser')


      await models.Item.destroy({
        where: { user_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })
      await models.Blob.destroy({
        where: { user_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })
      await models.UserTypesUser.destroy({
        where: { user_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })

      await models.UserAuths.destroy({
        where: { user_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })

      /*   await models.UserConversations.destroy({
           where: { user_id: item.id },
           transaction: options.transaction,
           individualHooks: true
   
         })*/

    })
  }

  static associate(models) {
    // Users.hasOne(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });
    Users.belongsTo(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });
    Users.hasMany(models.UserAuths, { as: "user_auths", targetKey: 'id', foreignKey: "user_id" });
    Users.belongsTo(models.UserTypes, { as: "user_type", targetKey: 'id', foreignKey: "usertype_id" });
    Users.hasMany(models.UserRoles, { as: "user_roles", targetKey: 'id', foreignKey: "user_id" });


    // Users.hasMany(models.UserAuth)
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
