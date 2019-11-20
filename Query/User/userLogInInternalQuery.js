import BaseQuery from '../../Architecture/baseQuery.js';
import UserLoginInternalDTO from './../../../Shared/DTO/User/UserLoginInternalDTO.js'
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';


export default class UserLogInInternalQuery extends BaseQuery {
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
        this.model = Object.assign(new UserLoginInternalDTO(), dto);;
    }

    async action() {
        return await this.userServiceDI.logInInternal({model:this.model});
       
    }
};
