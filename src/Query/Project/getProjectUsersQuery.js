import { ProjectDTO } from 'justshare-shared'
import BaseQuery from '../../Architecture/baseQuery.js';

export default class GetProjectUsersQuery extends BaseQuery {

    /**
 * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, projectServiceDI:ProjectService }}
  * @memberof LoginJustshareProjectQueryQuery
  */
    constructor({ logFileInfrastructureDI, projectServiceDI ,authInfrastructureDI,projectInfrastructureDI}) {
        super({ logFileInfrastructureDI, projectServiceDI,authInfrastructureDI,projectInfrastructureDI });
        this.projectServiceDI = projectServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new ProjectDTO(), dto);;
    }

    async action() {

        let result = await this.projectServiceDI.setContext(this.context).getProjctUsers({  });

        return result;


    }
};
