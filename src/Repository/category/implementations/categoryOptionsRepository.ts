import { ModelStatic } from "sequelize";
import { ICategoryOptionsRepository } from "..";
import { BaseRepositoryType } from "../../../Architecture";
import { CategoryOptionDBO } from "../../../DBO";
import { CategoryOption, CategoryOptionsLink, CategoryOptionsTemplate, CategoryOptionsType, CategoryOptionsTypeTemplate } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";



export default class CategoryOptionsRepository extends BaseRepositoryType<CategoryOptionDBO, CategoryOption> implements ICategoryOptionsRepository {
  sequelizeDI: IMappsDbModels
  categoryOptionsTypeDB: ModelStatic<CategoryOptionsType>;
  categoryOptionsTypeTemplateDB: ModelStatic<CategoryOptionsTypeTemplate>;
  categoryOptionDB: ModelStatic<CategoryOption>
  categoryOptionsTemplateDB: ModelStatic<CategoryOptionsTemplate>;

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.CategoryOption);
    this.categoryOptionsTypeDB = sequelizeDI.CategoryOptionsType;
    this.categoryOptionsTypeTemplateDB = sequelizeDI.CategoryOptionsTypeTemplate;
    this.categoryOptionDB = sequelizeDI.CategoryOption
    this.categoryOptionsTemplateDB = sequelizeDI.CategoryOptionsTemplate

    this.sequelizeDI = sequelizeDI;
  }
  getTypes({ transaction }: { transaction?: number }): Promise<CategoryOptionsType[]> {
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
  getRelatedOptions({ category_ids, transaction }: { category_ids: string[]; transaction?: number }): Promise<CategoryOption[]> {
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
          },
          {
            model: this.sequelizeDI.Translations,
            as: "value_translation",
            required: false,


          },
          ]
        },
        {
          model: this.sequelizeDI.Translations,
          as: "translation",
          required: false,
        },
      ],
      transaction: this.getTran({ transaction })
    });
  }

  upsertTemplate({ model, transaction }: { model: CategoryOptionDBO, transaction?: number }): Promise<[CategoryOptionsTemplate, boolean | null]> {
    return this.categoryOptionsTemplateDB.upsert(model, {
      transaction: this.getTran({ transaction })
    });
  }

  deleteTemplate({ model, transaction }: { model: CategoryOptionDBO, transaction?: number }): Promise<number> {
    return this.categoryOptionsTemplateDB.destroy({
      where: { id: this.toStr(model.id) },
      transaction: this.getTran({ transaction }),

    });
  }


  upsertToCategory({ model, transaction }: { model: CategoryOptionDBO, transaction?: number }): Promise<[CategoryOptionsLink, boolean | null]> {
    model.project_id = this.context.project.id;

    return this.sequelizeDI.CategoryOptionsLink.upsert(model, {
      transaction: this.getTran({ transaction }),
      returning: true,
      //individualHooks: true,
      //plain: true
    });
  }

  getAllCategoriesOption({ id, transaction }: { id?: string, transaction?: number }): Promise<CategoryOption[]> {
    let whereClaus = id ? { id: id, project_id: this.context.project.id } : { project_id: this.context.project.id };

    return this.categoryOptionDB.findAll({
      where: whereClaus,
      //order: [['name', 'ASC'], ['cat_opt_temp', 'value', 'ASC']],
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
          },
          {
            model: this.sequelizeDI.Translations,
            as: "value_translation",
          },
          ]
        },
        {
          model: this.sequelizeDI.Translations,
          as: "translation",
          required: false,
        },
      ],
      transaction: this.getTran({ transaction })
    });
  }


  upsertCategoryOptionsForCategory({ model, transaction }: { model: CategoryOptionDBO, transaction?: number }): Promise<[CategoryOptionsLink, boolean | null]> {
    model.project_id = this.context.project.id;
    return this.sequelizeDI.CategoryOptionsLink.upsert(model, {
      transaction: this.getTran({ transaction }),
      //individualHooks: true
    });
  }

  removeCategoryOptionsForCategory({ id, transaction }: { id: string, transaction?: number }): Promise<number> {
    return this.sequelizeDI.CategoryOptionsLink.destroy({
      where: { id: this.toStr(id), project_id: this.context.project.id },
      transaction: this.getTran({ transaction }),
      individualHooks: true

    });
  }

  getCategoryLinkQuery({ id, transaction }: { id: string, transaction?: number }): Promise<CategoryOptionsLink | null> {
    return this.sequelizeDI.CategoryOptionsLink.findOne({
      where: { id: this.toStr(id), project_id: this.context.project.id },
      transaction: this.getTran({ transaction }),
    });
  }
}


export const CategoryOptionsRepositoryPlugin = {
  pluginName: "category-options-repository",
  type: 'repository',
  di: 'categoryOptionsRepositoryDI',
  classType: CategoryOptionsRepository
};