"use strict";
import { BaseAction } from "./baseAction";
import { ClosingInfrastructure } from "../Infrastructure/closingInfrastructure.js";
import { DbTransactionInfrastucture } from "../Infrastructure/dbTransactionInfrastucture.js";
import { LogFileInfrastructure } from "../Infrastructure/logFileInfrastructure.js";
import { PrivilegesInfrastructure } from "../Infrastructure/privilegesInfrastructure.js";
import { ValidatonInfrastructure } from "../Infrastructure/validatonInfrastructure.js";

export class BaseCommand extends BaseAction {
  /**
   * Creates an instance of BaseCommand.
   * @param {{ logFileInfrastructureDI:LogFileInfrastructure, dbTransactionInfrastuctureDI : DbTransactionInfrastucture,validationInfrastructureDI:ValidatonInfrastructure,authInfrastructureDI:AuthInfrastucture, privilegesInfrastructureDI:PrivilegesInfrastructure,closingInfrastructureDI:ClosingInfrastructure}}
   * @memberof BaseCommand
   */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    dbTransactionInfrastuctureDI,
    validationInfrastructureDI,
    privilegesInfrastructureDI,
    dictionaryDI,
    closingInfrastructureDI,
    projectInfrastructureDI
  }) {
    super({ logFileInfrastructureDI, validationInfrastructureDI, authInfrastructureDI, privilegesInfrastructureDI, dictionaryDI, projectInfrastructureDI });
    this.dbTransactionInfrastuctureDI = dbTransactionInfrastuctureDI;
    this.closingInfrastructureDI = closingInfrastructureDI;

  }
  get validation() { }

  infrastructureOrder() {
    let infrastructureArray = [
      this.logFileInfrastructureDI,
      this.projectInfrastructureDI,
      this.authInfrastructureDI,
      this.validationInfrastructureDI,
      this.privilegesInfrastructureDI,
      this.closingInfrastructureDI,
      this.dbTransactionInfrastuctureDI
    ];
    return infrastructureArray.reduce((prv, curr, prevIndex) => {
      if (curr == null || typeof curr == "undefined") {
        return prv;
      }
      prv.setNext(curr);
      return curr;
    });
  }
}
