"use strict";

import { BaseInfrastracture } from "../Base/baseInfrastructure.js";


export class ClosingInfrastructure extends BaseInfrastracture {
    constructor() {
        super();
        this.funcArray = [];
    }


    async executeLayer(action) {

        return action;
    }
    async successLayer() {
        let arraysPromsis = this.funcArray.map(async item => {
            return await item();
        })
        return await Promise.all(arraysPromsis)
    }
    addClosingFunction(func) {
        this.funcArray.push(func);
    }
}
