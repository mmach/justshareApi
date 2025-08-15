import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/item/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blob/implementations/blobService.js';
import { RolesProjectDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/category/implementations/categoryOptionService.js';
import CategoryService from '../../Services/category/implementations/categoryService.js';


export default class GetProjectRolesQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({
        logFileInfrastructureDI,
        dbTransactionInfrastuctureDI,
        roleProjectServiceDI,
        projectInfrastructureDI
      }) {
        super({
          logFileInfrastructureDI,
          dbTransactionInfrastuctureDI,
          projectInfrastructureDI
        });
        this.roleProjectServiceDI = roleProjectServiceDI;
      }
      init(dto) {
     //   this.model = Object.assign(new RolesProjectDTO(), dto);
           this.model = dto;

      }
    
      get validation() {
        return [
          async () => { await this.checkDTO.bind(this)(this.model) }
        ]
          }
    
      async action() {
       return await this.roleProjectServiceDI.setContext(this.context).getRoles({ model: this.model, withProject: true })
      }
};
