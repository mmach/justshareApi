import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class MailTypesProjectRepository extends BaseRepository {

  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof MailTypesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.MailTypesProjects);
    this.sequelizeDI = sequelizeDI;
  }

  getAll({ model, transaction }) {
    return this.entityDAO.findAll({
      where:
      {
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.Translations,
          as: "translation"
        
        },
        {
          model: this.sequelizeDI.MailParts,
          as: "body"
        
        }, {
          model: this.sequelizeDI.MailParts,
          as: "template"
          
        },
        {
          model: this.sequelizeDI.MailSenders,
          as: "mailsender",
         
           include: [
            {
              model: this.sequelizeDI.Translations,
              as: "translation"
              
            },
          ]
        },
        {
          model: this.sequelizeDI.MailTypes,
          as: "mailtype"
          
        },
      ],

      transaction: this.getTran({ transaction })
    });
  }
}

