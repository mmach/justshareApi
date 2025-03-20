import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/Blobs/blobService.js';
import { BlobBase64DTO, SearchItemDTO,ItemDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/Categories/categoryOptionService.js';
import CategoryService from '../../Services/Categories/categoryService.js';


export default class GetRolesQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({
        logFileInfrastructureDI,
        dbTransactionInfrastuctureDI,
        roleServiceDI,
        projectInfrastructureDI
      }) {
        super({
          logFileInfrastructureDI,
          dbTransactionInfrastuctureDI,
          projectInfrastructureDI
        });
        this.roleServiceDI = roleServiceDI;
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
       return await this.roleServiceDI.setContext(this.context).getRoles({ model: this.model, withProject: true })
      }
};
