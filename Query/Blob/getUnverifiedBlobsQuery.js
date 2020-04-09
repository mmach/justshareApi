import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';

import BlobService from '../../Services/blobService.js';
import {BlobToVerifiedDTO,BlobBase64DTO,BlobDTO} from 'justshare-shared';



export default class GetUnverifiedBlobsQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,blobServiceDI:BlobService }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, blobServiceDI, authInfrastructureDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI,projectInfrastructureDI });
        this.blobServiceDI = blobServiceDI;
    };

    init(dto) {
        this.model = Object.assign(new BlobToVerifiedDTO(), dto);
    }

    async action() {

        let result = await this.blobServiceDI.setContext(this.context).getUnverified({ pagination: this.model });
        let uidList = result.map(item => {
            return item.blob_thumbmail.id;
        });
        if (uidList == null || uidList.length == 0) {
            return result;
        }
        let blobsResulst = await this.blobServiceDI.setContext(this.context).getBlobsBase64ByGuids({ ids: uidList });
        let combainBlobs = result.map(item => {
            let blobBase64 = blobsResulst.filter(element => {
                return item.blob_thumbmail.id == element.id
            })[0];
            let blobElement = Object.assign(new BlobDTO(), item)
            blobElement.blob_thumbmail = Object.assign(new BlobBase64DTO(), blobBase64);
            return blobElement;
        });

        return combainBlobs;


    }
};
