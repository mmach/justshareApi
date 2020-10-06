'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class ProcessChain extends Model {
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
        status_id: DataTypes.UUID,
        action_id: DataTypes.UUID,
        project_id: DataTypes.UUID,
        process_id: DataTypes.UUID,
        is_reminder: DataTypes.BOOLEAN,
        days_before: DataTypes.INTEGER,
        x: DataTypes.FLOAT,
        y: DataTypes.FLOAT,
        autorun: DataTypes.BOOLEAN,
        is_start: DataTypes.BOOLEAN,
        is_last: DataTypes.BOOLEAN,
        with_notification: DataTypes.BOOLEAN,
        has_reminder: DataTypes.BOOLEAN,
        popup_type: DataTypes.STRING,
        action_view_id: DataTypes.BOOLEAN,
        with_iua_status_change : DataTypes.BOOLEAN,
        get_iua_es : DataTypes.BOOLEAN,
   
      },
      { sequelize ,
        tableName: 'ProcessChains'
}
    );
  }
  static associate(models) {
    ProcessChain.hasMany(models.ProcessChainState, { as: "process_chain_state", targetKey: 'id', foreignKey: "process_chain_id" });

    // Users.hasMany(models.UserAuth)
  }
  static hooks(models, sequelize) {


  }
}
