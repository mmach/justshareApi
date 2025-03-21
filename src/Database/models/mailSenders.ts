'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for MailSenders attributes
 */
export interface MailSendersDTO {
  id: string;
  translation_id?: string;
  email?: string;
  password?: string;
  sendgrid_key?: string;
  smtp_host?: string;
  smtp_port?: string;
  smtp_security?: boolean;
  project_id?: string;
}

/**
 * Interface for MailSenders instance
 */
export interface MailSendersInstance extends Model<MailSendersDTO>, MailSendersDTO { }

/**
 * MailSenders model initialization
 */
export default class MailSenders extends Model<MailSendersInstance, MailSendersDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<MailSenders> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sendgrid_key: {
          type: DataTypes.STRING,
          allowNull: true
        },
        smtp_host: {
          type: DataTypes.STRING,
          allowNull: true
        },
        smtp_port: {
          type: DataTypes.STRING,
          allowNull: true
        },
        smtp_security: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'MailSenders'
      }
    );
  }

  static associate(models: any) {
    MailSenders.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }

  static hooks(models: any) {
    MailSenders.afterDestroy(async (item: any, options) => {
      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}