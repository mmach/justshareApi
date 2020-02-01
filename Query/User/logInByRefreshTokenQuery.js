import BaseQuery from '../../Architecture/baseQuery.js';
import {UserDTO} from 'justshare-shared';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';


export default class LogInByRefreshTokenQuery extends BaseQuery {
/**
 * Creates an instance of GetDictionariesQuery.
 * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService }}
 * @memberof UserLogInInternalQuery
 */
constructor({ logFileInfrastructureDI, userServiceDI }) {
        super({ logFileInfrastructureDI });
    
        this.userServiceDI=userServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new UserDTO(), dto);;
    }

    async action() {
        return await this.userServiceDI.logByRefreshToken({refresh_token:this.model.refresh_token});
       
    }
};
