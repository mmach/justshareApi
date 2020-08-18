import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import { BlobBase64DTO, ItemDTO } from 'justshare-shared';
import ItemTransactionService from '../../Services/itemTransactionsService.js';


export default class GetItemUserActionsQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemTransactionsServiceDI:ItemTransactionService }}
     * @memberof GetItemQuery
     */
    constructor({ logFileInfrastructureDI, itemUserActionServiceDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.itemUserActionServiceDI = itemUserActionServiceDI;

    };

    init(dto) {
        this.model = Object.assign(new ItemDTO(), dto);
    }

    async action() {

        let resultList = await this.itemUserActionServiceDI.setContext(this.context).getItemUserActions({ iua_id: [this.model.iua_id]});

        return resultList

    }
};
