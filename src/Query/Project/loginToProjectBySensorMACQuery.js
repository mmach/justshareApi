import { ProjectDTO } from 'justshare-shared';
import {BaseQuery} from '../../Architecture/Base/baseQuery.js';


export default class LoginToProjectBySensorMACQuery extends BaseQuery {

    /**
 * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, projectServiceDI:ProjectService }}
  * @memberof LoginJustshareProjectQueryQuery
  */
    constructor({ logFileInfrastructureDI, itemServiceDI, projectServiceDI }) {
        super({ logFileInfrastructureDI, projectServiceDI });
        this.projectServiceDI = projectServiceDI;
        this.itemServiceDI = itemServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new ProjectDTO(), dto);;
    }

    async action() {
        this.model.dim = 'DEVICE_MAC'

        let catoptions = []
        let itemCategorytion = await this.itemServiceDI.setContext(this.context).searchItemCategoryByValueAndDimQuery({
            value: this.model.value,
            dim_name: this.model.dim
        })
        if (itemCategorytion.length == 1) {

            let result = await this.projectServiceDI.setContext(this.context).authProject({ project_id: itemCategorytion[0].project_id, authBySensorMac: true });
            return result;
        }


    }
};
