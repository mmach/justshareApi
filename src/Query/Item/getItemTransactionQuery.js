import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import { BlobBase64DTO, ItemDTO } from 'justshare-shared';
import ItemTransactionService from '../../Services/itemTransactionsService.js';


export default class GetItemTransactionQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemTransactionsServiceDI:ItemTransactionService }}
     * @memberof GetItemQuery
     */
    constructor({ logFileInfrastructureDI, itemTransactionsServiceDI, authInfrastructureDI, projectInfrastructureDI, conversationServiceDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.itemTransactionsServiceDI = itemTransactionsServiceDI;
        this.conversationServiceDI = conversationServiceDI

    };

    init(dto) {
        this.model = Object.assign(new ItemDTO(), dto);
    }

    async action() {


        let resultList = await this.itemTransactionsServiceDI.setContext(this.context).getItemTransaction({ iua_id: 
            this.model.iua_ids?this.model.iua_ids:[this.model.iua_id],
             status_id: undefined,
              conversation_id: [this.model.conversation_id] });

        return resultList

    }
};
