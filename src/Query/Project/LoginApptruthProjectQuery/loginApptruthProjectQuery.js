import { ProjectDTO } from 'justshare-shared'
import CONFIG from '../../../config.js';
import ProjectService from '../../../Services/projectService.js';
import BaseQuery from '../../../Architecture/baseQuery.js';

export default class LoginApptruthProjectQuery extends BaseQuery {

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

        let reverseResult = await this.projectServiceDI.setContext(this.context).authProject({ project_id: '078C1B4E-F9BB-43C0-86E2-669BD4357E59', secretKey: 'DDD59B49-7A21-41C8-9CC7-18E63C35102C' });

        return reverseResult;


    }
};
