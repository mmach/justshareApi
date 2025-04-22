import { Transaction } from "sequelize";
import SequelizeDB from "../../Database/models/index.js";
import { AuthContextDTO } from "../../Dto/index.js";
import { REPOSITORIES } from "../../Repository/type.js";

export class BaseUnitOfWork {
    sequelize: any
    repositories: { [key: string]: any } & REPOSITORIES
    transaction?: Transaction | null
    constructor() {
        this.sequelize = SequelizeDB;
        this.repositories = {} as any
    }
    setContext({ context }: { context: AuthContextDTO }) {
        Object.keys(this.repositories).map(item => {
            this.repositories[String(item)].setContext({ context });
        })
    }
    setTransaction({ transaction }: { transaction: Transaction }) {
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

