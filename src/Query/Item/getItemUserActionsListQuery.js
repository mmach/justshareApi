import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import ItemTransactionService from '../../Services/item/itemTransactionsService.js';


export default class GetItemUserActionsListQuery extends BaseQuery {
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
        this.model = { ...dto };
    }

    async action() {

        let resultList = await this.itemUserActionServiceDI.setContext(this.context).getItemUserActionsList({ ...this.model });

        return resultList

    }
};
