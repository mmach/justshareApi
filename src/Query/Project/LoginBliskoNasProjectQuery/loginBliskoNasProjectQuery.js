import { ProjectDTO } from 'justshare-shared'
import CONFIG from '../../../config.js';
import ProjectService from '../../../Services/projectService.js';
import BaseQuery from '../../../Architecture/baseQuery.js';

export default class LoginBliskonasProjectQuery extends BaseQuery {

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

        let reverseResult = await this.projectServiceDI.setContext(this.context).authProject({ project_id: 'E6C92808-2984-402A-ADFE-5675878234FB', secretKey: '1CF567EA-F0F9-43BE-BA18-4F1F69008DA7' });

        return reverseResult;


    }
};
