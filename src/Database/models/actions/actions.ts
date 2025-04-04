'use strict';

import { Model, ModelStatic, Sequelize } from "sequelize";
import { DataTypes, } from "sequelize";
import { ActionsDTO } from "../../../Models/actions";

export interface ActionsInstance extends Model<ActionsDTO>, ActionsDTO { }


export default class Actions extends Model<ActionsInstance, ActionsDTO> {

  static initModel(sequelize: Sequelize): ModelStatic<Actions> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          //defaultValue: //DataTypes.UUIDV4

        },
        name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        },
        for_category: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        action_type: {
          type: DataTypes.STRING,
          allowNull: true
        },

        is_process_start: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { sequelize }
    );
  }
  static associate(models: any) {

  }
}
