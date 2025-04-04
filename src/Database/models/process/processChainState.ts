'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ProcessChainStateDTO } from "../../../Models/process";
/**
 * Interface for ProcessChainState instance
 */
export interface ProcessChainStateInstance extends Model<ProcessChainStateDTO>, ProcessChainStateDTO {}

/**
 * ProcessChainState model initialization
 */
export default class ProcessChainState extends Model<ProcessChainStateInstance, ProcessChainStateDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ProcessChainState> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        next_process_chain_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        process_chain_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_accept: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'ProcessChainStates'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }

  static hooks(models: any, sequelize: Sequelize) {
    // Define hooks here
  }
}