
"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class ConversationMessageMembers extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof Conversation
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
        user_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        conversation_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        message_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        project_id: {
          type: DataTypes.UUID,

        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
      },
      { sequelize ,
        tableName: 'ConversationMessageMembers'
      }
    );
  }

  static hooks(models) {


  }

  static associate(models) {
 
  }
}
