
"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class Conversation extends Model {
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
        user_owner_id: {
          type: DataTypes.UUID,
          allowNull: true
        },

        title: {
          type: DataTypes.STRING,
          allowNull: true
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false
        },
        project_id: {
          type: DataTypes.UUID,

        }

      },
      { sequelize }
    );
  }


  static associate(models) {

    //   Conversation.belongsTo(models.CategoryOptionsType, { as: "cat_opt", targetKey: 'id', foreignKey: "cot_id" });
    Conversation.hasMany(models.UserConversation, { as: "users", targetKey: 'id', foreignKey: "conversation_id" });
    Conversation.hasMany(models.ConversationMessages, { as: "messages", targetKey: 'id', foreignKey: "conversation_id" });
    Conversation.hasMany(models.UserConversation, { as: "user_filter", targetKey: 'id', foreignKey: "conversation_id" });

    //Conversation.hasMany(models.CategoryOptionsLink, { as: "category_link", targetKey: 'co_id', foreignKey: "co_id" });


    /* Item.belongsToMany(models.Category, {
       through: {
         model: models.ItemCategory,
         targetKey: "id",
         foreignKey: "continent_id"
       },
       as: "continents",
       targetKey: "id",
       foreignKey: "item_id"
     });
     
     Item.hasMany(models.Blob, {
       as: "blobs",
       targetKey: "id",
       foreignKey: "item_id"
     });
     //  Item.belongsTo(models.User);
     // Item.hasMany(models.ItemCategory)
     //  Blob.belongsTo(models.User);*/
  }
}
