import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import BlobService from '../../Services/blobService.js';
import {BlobBase64DTO,UserDTO} from 'justshare-shared';

export default class GetUserInfoQuery extends BaseQuery {
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
        this.model = Object.assign(new UserDTO(), dto);;
    }

    async action() {

        let user_Id = this.model.id !=''? this.model.id : this.context.user.id;
        let result = await this.userServiceDI.setContext(this.context).getUserInfo({ user_id: user_Id });
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
