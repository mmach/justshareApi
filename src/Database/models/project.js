"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class Project extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Country|Model}
   * @memberof Project
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

        secretKey: {
          type: DataTypes.STRING
        },
        project_id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.UUIDV4,
          allowNull: true

        }
        , categories_from_parent: {
          type: DataTypes.BOOLEAN
        }
        , theme_color: {
          type: DataTypes.STRING
        }
        , root_category_id: {
          type: DataTypes.UUID
        }
        , item_to_parent: {
          type: DataTypes.BOOLEAN
        }
        , logo_url: {
          type: DataTypes.STRING
        }
        , status: {
          type: DataTypes.BOOLEAN
        }
        , base_url: {
          type: DataTypes.STRING
        }
        , contact_mail: {
          type: DataTypes.STRING
        }
        , blob_logo_id: {
          type: DataTypes.UUID
        }
        , blob_logo_hor_id: {
          type: DataTypes.UUID
        }
        , blob_logo_ver_id: {
          type: DataTypes.UUID
        }
        , blob_main_id: {
          type: DataTypes.UUID
        }
        , description: {
          type: DataTypes.STRING
        }
        , user_id: {
          type: DataTypes.UUID
        }
        , plan_id: {
          type: DataTypes.UUID
        }
        , auth_url: {
          type: DataTypes.STRING
        }
        , blob_main_phone_id: {
          type: DataTypes.UUID
        }
      },
      { sequelize }
    );
  }
  static associate(models) {
    Project.belongsTo(models.Blob, {
      as: "logo",
      targetKey: "id",
      foreignKey: "blob_logo_id"
    });
    Project.belongsTo(models.Blob, {
      as: "logo_hor",
      targetKey: "id",
      foreignKey: "blob_logo_hor_id"
    });
    Project.belongsTo(models.Blob, {
      as: "img_main_phone",
      targetKey: "id",
      foreignKey: "blob_main_phone_id"
    });
    Project.belongsTo(models.Blob, {
      as: "logo_ver",
      targetKey: "id",
      foreignKey: "blob_logo_ver_id"
    });
    Project.belongsTo(models.Blob, {
      as: "img_main",
      targetKey: "id",
      foreignKey: "blob_main_id"
    });
    Project.hasMany(models.V_User, {
      as: "users",
      targetKey: "id",
      foreignKey: "project_id"
    });
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
