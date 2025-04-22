import { Sequelize, ModelStatic } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { ProcessDBO } from "../../../DBO";
import { Process, vProject } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IProjectRepository } from "../projectRepository";

export default class ProjectRepository extends BaseRepositoryType<ProcessDBO, Process> implements IProjectRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  V_ProjectDB: ModelStatic<vProject>
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.Project);
    this.V_ProjectDB = sequelizeDI.V_Project
    //this.UserVDB = sequelizeDI.V_User
    this.sequelizeDI = sequelizeDI;
  }

  getProjectInfo({ project_id, transaction }: { project_id: string, transaction?: number }): Promise<vProject | null> {
    return this.V_ProjectDB.findOne({
      where: {
        id: this.toStr(project_id)
      },
      transaction: this.getTran({ transaction })
    })
  }
  getProjectDetails({ id, transaction }: { id: string, transaction?: number }): Promise<vProject | null> {
    return this.V_ProjectDB.findOne({
      where: {
        id: this.toStr(id)
      },
      include: [
        {
          model: this.sequelizeDI.V_User,
          required: false,
          as: "owner"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "logo"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "logo_hor"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "logo_ver"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "img_main"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "img_main_phone"
        },

      ],
      transaction: this.getTran({ transaction })
    })
  }
  authProject({ project_id, secretKey, authBySensorMac, transaction }: { project_id: string, secretKey: string, authBySensorMac: boolean, transaction?: number }): Promise<Process | null> {
    let where: { id: string, secretKey?: string } = {
      id: this.toStr(project_id),
    }
    if (!authBySensorMac) {
      where.secretKey = this.toStr(secretKey)
    }
    return this.entityDAO.findOne(

      {
        where: where,
        transaction: this.getTran({ transaction })
      }
    );
  }
  getProjectsSockets({ transaction }: { transaction?: number }): Promise<Process[]> {
    return this.entityDAO.findAll(
      {
        attributes: ['salt', 'id'],
        transaction: this.getTran({ transaction })
      }
    );
  }

  getProjctUsers({ transaction }: { transaction?: number }): Promise<vProject | null> {
    return this.V_ProjectDB.findOne({
      where: {
        id: this.toStr(this.context.project.id)
      },
      include: [
        {
          model: this.sequelizeDI.V_User,
          required: false,
          as: "users",
          include: [
            {
              model: this.sequelizeDI.Blob,
              as: "blob_profile",
              required: false,
              include: [
                {
                  model: this.sequelizeDI.BlobMapper,
                  as: "blob_item",
                  required: true
                },
                {
                  model: this.sequelizeDI.BlobMapper,
                  as: "blob_thumbmail",
                  required: true
                }
              ],
            },
            {
              model: this.sequelizeDI.UserTypes,
              required: false,
              as: "user_type",
              include: [
                {
                  model: this.sequelizeDI.UserTypeRoles,
                  as: "usertype_roles",
                  include: [
                    {
                      model: this.sequelizeDI.RolesProject,
                      as: "roles",
                      include: [
                        {
                          model: this.sequelizeDI.Roles,
                          as: "role_detail",
                        }
                      ]
                    }
                  ]
                },
                {
                  model: this.sequelizeDI.Translations,
                  as: "translation"
                }
              ]
            },
            {
              model: this.sequelizeDI.UserRoles,
              as: "user_roles",
              required: false,
              include: [
                {
                  model: this.sequelizeDI.RolesProject,
                  as: "roles",
                  required: true,
                  include: [
                    {
                      model: this.sequelizeDI.Roles,
                      as: "role_detail",
                      required: true
                    }
                  ],
                }
              ],
            }
          ]
        },

      ],
      transaction: this.getTran({ transaction })
    })
  }

}

export const ProjectRepositoryPlugin = {
  pluginName: "project-repository",
  type: 'repository',
  di: 'projectRepositoryDI',
  classType: ProjectRepository
};