import { ProjectDTO } from 'justshare-shared'
import CONFIG from '../../../config.js';
import ProjectService from '../../../Services/projectService.js';
import BaseQuery from '../../../Architecture/baseQuery.js';

export default class LoginProjectQuery extends BaseQuery {

    /**
 * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, projectServiceDI:ProjectService }}
  * @memberof LoginJustshareProjectQueryQuery
  */
    constructor({ logFileInfrastructureDI, projectServiceDI }) {
        super({ logFileInfrastructureDI, projectServiceDI });
        this.projectServiceDI = projectServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new ProjectDTO(), dto);;
    }

    async action() {

        let result = await this.projectServiceDI.setContext(this.context).authProject({ project_id: this.model.id, secretKey: this.model.secretKey });

        return result;


    }
};
