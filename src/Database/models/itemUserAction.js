'use strict';

import { Model } from 'sequelize';



export default class ItemUserAction extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {itemCategoryOption|Model}
   * @memberof itemCategoryOption
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
        item_id: DataTypes.UUID,
        project_id: DataTypes.UUID,
        user_id: DataTypes.UUID,
        action_id: DataTypes.UUID,
        comment: DataTypes.TEXT,
        rating: DataTypes.INTEGER,
        status: DataTypes.STRING,
        iua_id: DataTypes.UUID,
        iua_prev_id: DataTypes.UUID,
        status_id: DataTypes.UUID,
        uniq_number: DataTypes.STRING,
        created_date: DataTypes.DATE

      },
      { sequelize }
    );
  }
  static associate(models) {
    ItemUserAction.hasOne(models.Conversation, {
      as: "conversation",
      targetKey: "id",
      foreignKey: "iua_id"
    });
    ItemUserAction.belongsTo(models.V_User, {
      as: "users",
      targetKey: "id",
      foreignKey: "user_id"
    });
  }
}
