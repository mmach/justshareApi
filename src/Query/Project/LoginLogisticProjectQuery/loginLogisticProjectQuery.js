import { ProjectDTO } from 'justshare-shared'
import CONFIG from '../../../config.js';
import ProjectService from '../../../Services/projectService.js';
import BaseQuery from '../../../Architecture/baseQuery.js';

export default class LoginLogisticProjectQuery extends BaseQuery {

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

        let reverseResult = await this.projectServiceDI.setContext(this.context).authProject({ project_id: '16B9FAF4-1E2C-482E-B48B-D7D02CF38D8E', secretKey: 'D45C24D4-8E40-4825-B4DC-B4C5DD93B17C' });

        return reverseResult;


    }
};
