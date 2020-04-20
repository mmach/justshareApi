"use strict";
import BaseAction from "./baseAction.js";

export default class BaseQuery extends BaseAction {
  // we can set other DbInfrastracture as more extend  CQRS pattern
  constructor({ logFileInfrastructureDI, validationInfrastructureDI, authInfrastructureDI, privilegesInfrastructureDI,projectInfrastructureDI }) {
    super({ logFileInfrastructureDI, validationInfrastructureDI, authInfrastructureDI, privilegesInfrastructureDI,projectInfrastructureDI });
  }

  infrastructureOrder() {
    let infrastructureArray = [
      this.logFileInfrastructureDI,
      this.projectInfrastructureDI,
      this.authInfrastructureDI,
      this.privilegesInfrastructureDI
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
