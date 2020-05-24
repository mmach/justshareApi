"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class PrivilegesProject extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {PrivilegesProject|Model}
   * @memberof PrivilegesProject
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
        privilege_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status: {
          type: DataTypes.BOOLEAN
        },
      
      },
      { sequelize }
    );
  }
  static associate(models) {
    PrivilegesProject.belongsTo(models.Privileges, { as: "privilege_details", targetKey: 'id', foreignKey: "privilege_id" });
   
  }
}

/*


module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clobSearch: DataTypes.TEXT,
    clobSearch_pl: DataTypes.TEXT,
    clobSearch_us: DataTypes.TEXT
  }, {underscored: true});
  Item.associate = function(models) {
    Item.belongsTo(models.User);
    Item.hasMany(models.ItemCategory)
    // associations can be defined here
  };
  return Item;
};*/
