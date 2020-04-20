import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import fs from 'fs';
/**
 *
 * @export
 * @class BlobRepository
 * @extends BaseRepository
 */
export default class ConfigRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof BlobRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Config);
    this.sequelizeDI = sequelizeDI;
  }


  getByName({
    type, lang,
    transaction
  }) {
    let where = { type: type,
      project_id:this.context.project.id };
    if (lang) {
      where.lang = lang;
    }

    return this.entityDAO.findOne({
      where: where
      ,
      transaction: this.getTran({ transaction })
    })
  }
  getByNames({
    types, lang,
    transaction
  }) {
   

    return this.entityDAO.findAll({
      where: {
        
        type:types,
        project_id:this.context.project.id,
        lang:this.sequelizeDI.sequelize.literal(`lang IS NULL OR lang ='${String(lang).replace(`'`,'')}'`)

      }
      ,
      transaction: this.getTran({ transaction })
    })
  }


}
