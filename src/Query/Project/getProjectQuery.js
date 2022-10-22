import { ProjectDTO } from 'justshare-shared'
import BaseQuery from '../../Architecture/baseQuery.js';


export default class GetProjectQuery extends BaseQuery {

    /**
 * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, projectServiceDI:ProjectService }}
  * @memberof LoginJustshareProjectQueryQuery
  */
    constructor({ logFileInfrastructureDI, projectServiceDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, projectServiceDI ,projectInfrastructureDI});
        this.projectServiceDI = projectServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new ProjectDTO(), dto);;
    }

    async action() {

        let result = await this.projectServiceDI.setContext(this.context).getProjctInfo({ id: this.context.project.id, withProject: false });

        return result;


    }
};
