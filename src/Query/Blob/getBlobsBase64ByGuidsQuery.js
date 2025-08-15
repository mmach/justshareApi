import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import BlobService from '../../Services/blob/implementations/blobService.js';
import {BlobMapperDTO} from 'justshare-shared'


export default class GetBlobsBase64ByGuidsQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,blobServiceDI:BlobService }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, blobServiceDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI,projectInfrastructureDI });

        this.blobServiceDI = blobServiceDI;
    };

    init(dto) {
        this.model = dto.map(item => {
            return Object.assign(new BlobMapperDTO(), item);
        });
    }

    async action() {
        let uidList = this.model.map(item => {
            return item.id;
        })
        return await this.blobServiceDI.setContext(this.context).getBlobsBase64ByGuids({ ids: uidList });

    }
};
