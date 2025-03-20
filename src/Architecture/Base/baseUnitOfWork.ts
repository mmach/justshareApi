import { Transaction } from "sequelize";
import SequelizeDB from "../../Database/models/index.js";

export class BaseUnitOfWork {
    sequelize: any
    repositories: any
    transaction?: Transaction
    constructor() {
        this.sequelize = SequelizeDB;
        this.repositories = {};
    }
    setContext({ context }: any) {
        Object.keys(this.repositories).map(item => {
            this.repositories[String(item)].setContext({ context });
        })
    }
    async setTransaction({ transaction }: { transaction: Transaction }) {
        this.transaction = transaction;
        Object.keys(this.repositories).map(item => {
            this.repositories[String(item)].setTransaction({ transaction: transaction });
        })

    }
    async startTransaction() {
        let transaction = await this.sequelize.sequelize.transaction();

        return transaction;
    };
    async commit({ transaction }: { transaction: Transaction }) {
        return await transaction.commit();
    }
    async rollback({ transaction }: { transaction: Transaction }) {

        return await transaction.rollback();
    }

};

