import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import { BlobBase64DTO, ItemDTO } from 'justshare-shared';
import ItemTransactionService from '../../Services/itemTransactionsService.js';


export default class GetProcessCronsQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemTransactionsServiceDI:ItemTransactionService }}
     * @memberof GetItemQuery
     */
    constructor({ logFileInfrastructureDI, processServiceDI }) {
        super({ logFileInfrastructureDI });
        this.processServiceDI = processServiceDI;

    };

    init(dto) {
        this.model = { ...dto };
    }

    async action() {
        let resultList = await this.processServiceDI.setContext(this.context).getProcessCrons({})
        return resultList
    }
};
