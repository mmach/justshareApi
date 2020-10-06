'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class ProcessChainState extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {UserAuths|Model}
   * @memberof UserAuths
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

        next_process_chain_id: DataTypes.UUID,

        process_chain_id: DataTypes.UUID,
        project_id: DataTypes.UUID,
        process_id: DataTypes.UUID,
        is_accept: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'ProcessChainStates'
      }
    );
  }
  static associate(models) {

    // Users.hasMany(models.UserAuth)
  }
  static hooks(models, sequelize) {


  }
}
