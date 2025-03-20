import { UserDTO } from 'justshare-shared';
import { validate } from 'uuid';
import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';


export default class LogInByRefreshTokenQuery extends BaseQuery {
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
        this.model = Object.assign(new UserDTO(), dto);;
    }

    async action() {
        if (validate(this.model.refresh_token)) {
            return await this.userServiceDI.setContext(this.context).logByRefreshToken({ refresh_token: this.model.refresh_token });
        } else {
            return 'WRONG REFRESH_TOKEN'
        }
    }
};
