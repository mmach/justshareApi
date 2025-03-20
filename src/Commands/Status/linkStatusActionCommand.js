import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import { AuthInfrastucture } from '../../Architecture/Infrastructure/authInfrastucture.js';
import { LogFileInfrastructure } from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';






export default class LinkStatusActionCommand extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI, projectInfrastructureDI, statusProjectServiceDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI });
        this.statusProjectServiceDI = statusProjectServiceDI;
    };
    init(dto) {
        this.model = { ...dto };;
    }

    async action() {
        return this.statusProjectServiceDI.setContext(this.context).linkStatus({ model: this.model})

    }
};
