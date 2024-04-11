import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import BaseQuery from '../../Architecture/baseQuery.js';
import ItemTransactionService from '../../Services/itemTransactionsService.js';


export default class GetUserInvoicesQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemTransactionsServiceDI:ItemTransactionService }}
     * @memberof GetItemQuery
     */
    constructor({ logFileInfrastructureDI, invoiceServiceDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.invoiceServiceDI = invoiceServiceDI;

    };

    init(dto) {
        this.model = { ...dto };
    }

    async action() {

        let resultList = await this.invoiceServiceDI.setContext(this.context).getUserInvoices({
            iua_id: this.model.iua_id,
            status: this.model.status,
            page: this.model.page,
            size: this.model.size,
            asAdmin: this.model.asAdmin,
            month: this.model.month,
            year: this.model.year
        });
        return resultList

    }
};
