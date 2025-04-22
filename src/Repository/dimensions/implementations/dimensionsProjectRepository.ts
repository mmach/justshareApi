import { BaseRepositoryType } from "../../../Architecture";
import { DimensionsProjectDBO } from "../../../DBO";
import { DimensionsProject } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IDimensionsProjectRepository } from "../dimensionsProjectRepository";


export default class DimensionsProjectRepository extends BaseRepositoryType<DimensionsProjectDBO, DimensionsProject> implements IDimensionsProjectRepository   {
  sequelizeDI: IMappsDbModels;
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }){
    super(sequelizeDI.DimensionsProject);
    this.sequelizeDI = sequelizeDI;
  }
  getDimensions({ transaction }: { transaction?: number }): Promise<DimensionsProject[]> {
    return this.entityDAO.findAll({
      where:
      {
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.Dimensions,
          as: "dimension_details"
        
        },
        {
          model: this.sequelizeDI.Translations,
          as: "translation"
      
        },
      ],

      transaction: this.getTran({ transaction })
    });
  }
}

export const DimensionsProjectRepositoryPlugin = {
  pluginName: "dimensions-project-repository",
  type: 'repository',
  di: 'dimensionsProjectRepositoryDI',
  classType: DimensionsProjectRepository
};