import BaseQuery from '../../Architecture/baseQuery.js';
import { UserDTO } from 'justshare-shared';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import { isUuid } from '../../../node_modules/uuidv4/build/lib/uuidv4.js';


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
        if (isUuid(this.model.refresh_token)) {
            return await this.userServiceDI.setContext(this.context).logByRefreshToken({ refresh_token: this.model.refresh_token });
        } else {
            return 'WRONG REFRESH_TOKEN'
        }
    }
};
