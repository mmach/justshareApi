import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import { UserLoginInternalDTO } from 'justshare-shared'
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';


export default class UserLogInInternalQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI });

        this.userServiceDI = userServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new UserLoginInternalDTO(), dto);;
    }

    async action() {
        return await this.userServiceDI.setContext(this.context).logInInternal({ model: this.model });

    }
};
