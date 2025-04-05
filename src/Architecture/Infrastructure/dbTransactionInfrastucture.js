"use strict";

import { BaseInfrastracture } from '../Base/baseInfrastructure.js';
import { BaseUnitOfWork } from '../Base/baseUnitOfWork.js';


export class DbTransactionInfrastucture extends BaseInfrastracture {
    /**
     * Creates an instance of DbTransactionInfrastucture.
     * @param   {{ unitOfWorkDI:BaseUnitOfWork }} 
     * @memberof DbTransactionInfrastucture
     */
    constructor({ unitOfWorkDI }) {
        super();
        this.unitOfWorkDI = unitOfWorkDI;
        this.transaction = null;

    };
    async successLayer(dtoObject) {
        return await this.unitOfWorkDI.commit({ transaction: this.transaction });
    }
    async executeLayer(action) {
        this.transaction = await this.unitOfWorkDI.startTransaction();
        this.unitOfWorkDI.setTransaction({ transaction: this.transaction });
        return await action;

    }
    async errorHandling(err, action) {

        return await this.unitOfWorkDI.rollback({ transaction: this.transaction });

    }

}