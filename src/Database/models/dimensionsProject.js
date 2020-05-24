'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class DimensionsProject extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {ActionsProject|Model}
   * @memberof ActionsProject
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
        dimension_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        translation_id: {
          type: DataTypes.STRING,
          allowNull: true
        }

      },
      { sequelize }
    );
  }
  static associate(models) {
    DimensionsProject.belongsTo(models.Dimensions, { as: "dimension_details", targetKey: 'id', foreignKey: "dimension_id" });
    DimensionsProject.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });

    // Users.hasOne(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });


    // Users.hasMany(models.UserAuth)
  }
  static hooks(models, sequelize) {

    DimensionsProject.afterDestroy(async (item, options) => {



      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true

      })
    })
  }
}
