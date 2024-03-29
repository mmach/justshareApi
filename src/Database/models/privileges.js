"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class Privileges extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Privileges|Model}
   * @memberof Privileges
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
          allowNull: true
        },
      
        status: {
          type: DataTypes.BOOLEAN
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
      
      },
      { sequelize }
    );
  }
  static associate(models) {

  }
  static hooks(models, sequelize) {

    Privileges.beforeDestroy(async (item, options) => {

      await models.PrivilegesProject.destroy({
        where: { privilege_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })
    })
  }
}
