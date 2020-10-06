'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class MailTypesProjects extends Model {
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
        mailsender_id: DataTypes.UUID,
        mail_body_id: DataTypes.UUID,
        mail_template_id: DataTypes.UUID,
        mailtype_id: DataTypes.UUID,
        project_id: DataTypes.UUID,

      },
      { sequelize,
        tableName: 'MailTypesProjects'
      }
    );
  }
  static associate(models) {
    MailTypesProjects.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
    MailTypesProjects.belongsTo(models.MailSenders, { as: "mailsender", targetKey: 'id', foreignKey: "mailsender_id" });
    MailTypesProjects.belongsTo(models.MailParts, { as: "body", targetKey: 'id', foreignKey: "mail_body_id" });
    MailTypesProjects.belongsTo(models.MailParts, { as: "template", targetKey: 'id', foreignKey: "mail_template_id" });
    MailTypesProjects.belongsTo(models.MailTypes, { as: "mailtype", targetKey: 'id', foreignKey: "mailtype_id" });

    // Users.hasMany(models.UserAuth)
  }
  static hooks(models, sequelize) {

    MailTypesProjects.afterDestroy(async (item, options) => {
      await models.Translations.destroy({
        where: { id: item.translation_id },
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
