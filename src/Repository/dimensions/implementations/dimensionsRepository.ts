import { Sequelize } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { DimensionsDBO } from "../../../DBO";
import { Dimensions } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IDimensionsRepository } from "../dimensionsRepository";



export default class DimensionsRepository extends BaseRepositoryType<DimensionsDBO, Dimensions> implements IDimensionsRepository{
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.Dimensions);
    this.sequelizeDI = sequelizeDI;
  }

  getDimensions({ transaction }: { transaction?: number }): Promise<Dimensions[]> {
    return this.entityDAO.findAll({
      where: {},
      transaction: this.getTran({ transaction })
    });
  }

}

export const DimensionsRepositoryPlugin = {
  pluginName: "dimensions-repository",
  type: 'repository',
  di: 'dimensionsRepositoryDI',
  classType: DimensionsRepository
};
