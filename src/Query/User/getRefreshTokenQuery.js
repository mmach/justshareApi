import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {UserDTO} from 'justshare-shared';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import {AuthInfrastucture}from '../../Architecture/Infrastructure/authInfrastucture.js';



export default class GetRefreshTokenQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI,projectInfrastructureDI });

        this.userServiceDI = userServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new UserDTO(), dto);;
    }

    async action() {
        return await this.userServiceDI.setContext(this.context).getRefreshToken();

    }
};
