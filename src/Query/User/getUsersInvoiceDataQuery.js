import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import BlobService from '../../Services/Blobs/implementations/blobService.js';
import {BlobBase64DTO,UserDTO} from 'justshare-shared';

export default class GetUsersInvoiceDataQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,blobServiceDI: BlobService}}
     * @memberof GetUserInfoQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI, blobServiceDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI,projectInfrastructureDI });

        this.userServiceDI = userServiceDI;
        this.blobServiceDI = blobServiceDI
    };
    init(dto) {
        this.model ={...dto};;
    }

    async action() {

        
        let result = await this.userServiceDI.setContext(this.context).getUserInvoiceData({ user_id: this.model.user_id });
        /*if (result.blob_profile != null) {
            let blobsResulst = await this.blobServiceDI.getBlobsBase64ByGuids({
                ids: [result.blob_profile.blob_thumbmail.id
                ]
            });

            let blobBase64 = blobsResulst.filter(element => {
                return result.blob_profile.blob_thumbmail.id == element.id
            })[0]
            result.blob_profile.blob_thumbmail = Object.assign(new BlobBase64DTO(), blobBase64);

        }*/
        return result;



    }
};
