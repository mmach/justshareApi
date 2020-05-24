'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class LanguageProject extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Language|Model}
   * @memberof Language
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
        language_id: {
          type: DataTypes.UUID,
          allowNull: true
        }, 
         project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_main: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      { sequelize }
    );
  }
  static associate(models) {
    LanguageProject.belongsTo(models.Language, { as: "lang_details", targetKey: 'id', foreignKey: "language_id" });

 
  }
}
