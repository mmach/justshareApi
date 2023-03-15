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

        let result = await this.blobServiceDI.setContext(this.context).getUnverified({  });
      
      

        return result;


    }
};
