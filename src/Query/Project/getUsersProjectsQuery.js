import { ProjectDTO } from 'justshare-shared'
import BaseQuery from '../../Architecture/baseQuery';


export default class GetUsersProjectsQuery extends BaseQuery {

    /**
 * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, projectServiceDI:ProjectService }}
  * @memberof LoginJustshareProjectQueryQuery
  */
    constructor({ logFileInfrastructureDI, userServiceDI,authInfrastructureDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI ,authInfrastructureDI,projectInfrastructureDI});
        this.userServiceDI = userServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new ProjectDTO(), dto);;
    }

    async action() {

        let result = await this.userServiceDI.setContext(this.context).getUsersProject({ });

        return result;


    }
};
