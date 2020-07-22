import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";


/**
 *
 * @export
 * @class CategoryOptionsRepository
 * @extends BaseRepository
 */
export default class CategoryOptionsRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CategoryOptionsRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CategoryOption);
    this.categoryOptionsTypeDB = sequelizeDI.CategoryOptionsType;
    this.categoryOptionsTypeTemplateDB = sequelizeDI.CategoryOptionsTypeTemplate;
    this.categoryOptionDB = sequelizeDI.CategoryOption
    this.categoryOptionsTemplateDB = sequelizeDI.CategoryOptionsTemplate

    this.sequelizeDI = sequelizeDI;
  }
  getTypes({ transaction }) {
    return this.categoryOptionsTypeDB.findAll({
      where: {
        status: 1
      },
      order: [['type', 'ASC'], ['name', 'ASC']]
      ,
      include: [
        {
          model: this.sequelizeDI.CategoryOptionsTypeTemplate,
          as: "cat_options_type_temp"
          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_children"
           }
           ]*/
        },


      ],
      transaction: this.getTran({ transaction })
    });
  }
  getRelatedOptions({ category_ids, transaction }) {
    return this.categoryOptionDB.findAll({
      where: { project_id: this.context.project.id },
      order: [['name', 'ASC'], ['cat_opt_temp', 'order', 'ASC']],
      include: [
        {
          model: this.sequelizeDI.CategoryOptionsLink,
          as: "category_link",
          required: true,
          where: {
            category_id: category_ids
          },
        },
        {
          model: this.sequelizeDI.CategoryOptionsType,
          as: "cat_opt",
          required: true,
          where: {
            status: 1
          },
          include: [
            {
              model: this.sequelizeDI.CategoryOptionsTypeTemplate,
              as: "cat_options_type_temp"

              /* include: [{
                 model: this.sequelizeDI.Category,
                 as: "category_children"
               }
               ]*/
            },


          ],          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_children"
           }
           ]*/
        },
        {
          model: this.sequelizeDI.CategoryOptionsTemplate,
          as: "cat_opt_temp",

          include: [{
            model: this.sequelizeDI.CategoryOptionsTypeTemplate,
            as: "cat_opt_type_template"
          }
          ]
        },

      ],
      transaction: this.getTran({ transaction })
    });
  }


  /**
   *
   * @param  {{ model : BaseDTO}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  upsertTemplate({ model, transaction }) {
    return this.categoryOptionsTemplateDB.upsert(model, {
      transaction: this.getTran({ transaction })
    });
  }

  /**
  *
  * @param  {{ model : BaseDTO}}
  * @return {Promise<any>}
  * @memberof BaseRepository
  */
  deleteTemplate({ model, transaction }) {
    return this.categoryOptionsTemplateDB.destroy({
      where: { id: this.toStr(model.id) },
      transaction: this.getTran({ transaction }),

    });
  }


  upsertToCategory({ model, transaction }) {
    model.project_id = this.context.project.id;
    
    return this.sequelizeDI.CategoryOptionsLink.upsert(model, {

      transaction: this.getTran({ transaction }),
      returning: true,
      individualHooks: true,
      plain: true
    });
  }

  getAllCategoriesOption({ id, transaction }) {
    let whereClaus = id ? { id: id, project_id: this.context.project.id } : { project_id: this.context.project.id };

    return this.categoryOptionDB.findAll({
      where: whereClaus,
      order: [['name', 'ASC'], ['cat_opt_temp', 'value', 'ASC']],
      include: [
        {
          model: this.sequelizeDI.CategoryOptionsLink,
          as: "category_link",
          required: false,
          include: [
            {
              model: this.sequelizeDI.V_Category,
              as: "category",
              where: { project_id: this.context.project.id }

            },
          ],
        },
        {
          model: this.sequelizeDI.CategoryOptionsType,
          as: "cat_opt",
          required: true,
          where: {
            status: 1
          },
          include: [
            {
              model: this.sequelizeDI.CategoryOptionsTypeTemplate,
              as: "cat_options_type_temp"


            },
          ],
        },
        {
          model: this.sequelizeDI.CategoryOptionsTemplate,
          as: "cat_opt_temp",

          include: [{
            model: this.sequelizeDI.CategoryOptionsTypeTemplate,
            as: "cat_opt_type_template"
          }
          ]
        },

      ],
      transaction: this.getTran({ transaction })
    });
  }


  /**
   *
   * @param  {{ model : BaseDTO}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  upsertCategoryOptionsForCategory({ model, transaction }) {
    model.project_id = this.context.project.id;

    return this.sequelizeDI.CategoryOptionsLink.upsert(model, {
      transaction: this.getTran({ transaction }),
      individualHooks: true

    });
  }
  removeCategoryOptionsForCategory({ id, transaction }) {

    return this.sequelizeDI.CategoryOptionsLink.destroy({
      where: { id: this.toStr(id), project_id: this.context.project.id },
      transaction: this.getTran({ transaction }),
      individualHooks: true

    });
  }
  getCategoryLinkQuery({ id, transaction }) {
    return this.sequelizeDI.CategoryOptionsLink.find({
      where: { id: this.toStr(id), project_id: this.context.project.id },
      transaction: this.getTran({ transaction }),

    });
  }
}

