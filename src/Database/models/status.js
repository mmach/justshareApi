'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class Status extends Model {
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
        token: DataTypes.STRING,
        project_id: {
          type: DataTypes.STRING,
          allowNull: true
        },

      },
      { sequelize }
    );
  }
  static associate(models) {

    // Users.hasMany(models.UserAuth)
  }
  static hooks(models, sequelize) {


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
