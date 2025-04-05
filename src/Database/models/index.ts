'use strict';

import { Sequelize } from "sequelize";
import { DBConfig } from "../config/config";
import { Users, Category, CategoryHierarchy, BlobMapper, Item, ItemCategory, vUser, Country, City, UserAuths, CategoryOptionsType, CategoryOptionsTypeTemplate, CategoryOptionsTemplate, CategoryOption, CategoryOptionsLink, ItemCategoryOption, Tag, ItemTag, Project, Config, UserTypes, EsItemSync, Translations, Language, LanguageProject, Actions, ActionPrivileges, ActionsProject, CategoryActions, Privileges, PrivilegesProject, Roles, RolesProject, UserRoles, UserTypeRoles, DimensionsProject, Dimensions, vProject, MailParts, MailSenders, MailTypes, MailTypesProjects, Seos, V_Category, ItemUserAction, ItemTransactionCategoryOptions, ItemTransaction, Conversation, UserConversation, ConversationMessages, ConversationMessageMembers, Status, StatusActions, StatusProjects, ItemCategoryOptionTerm, Comment, Invoice, InvoiceUser, InvoiceItem, UserInvoiceValue, ProcessChain, Process, ProcessChainState, ItemProcessState, ProcessChainActionInjection, ProcessChainPrivilege, CmsElementsProject, CmsMenuItemsPrivilegesProjects, CmsMenuItemsProjects, CmsMenuProjects, CmsPagesProjects, CmsPagePrivilegesProjects, Blob } from "../../Domain";
import { IMappsDbModels } from "../../Domain/models";

const env = process.env.NODE_ENV || "development";
const config = (DBConfig as any)[env];
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] as string, config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {
  sequelize,
  Sequelize,
};

const models: IMappsDbModels = {
  Users: Users.initModel(sequelize),
  Category: Category.initModel(sequelize),
  CategoryHierarchy: CategoryHierarchy.initModel(sequelize),
  BlobMapper: BlobMapper.initModel(sequelize),
  Item: Item.initModel(sequelize),
  ItemCategory: ItemCategory.initModel(sequelize),
  Blob: Blob.initModel(sequelize),
  V_User: vUser.initModel(sequelize),
  Country: Country.initModel(sequelize),
  City: City.initModel(sequelize),
  UserAuths: UserAuths.initModel(sequelize),
  CategoryOptionsType: CategoryOptionsType.initModel(sequelize),
  CategoryOptionsTypeTemplate: CategoryOptionsTypeTemplate.initModel(sequelize),
  CategoryOptionsTemplate: CategoryOptionsTemplate.initModel(sequelize),
  CategoryOption: CategoryOption.initModel(sequelize),
  CategoryOptionsLink: CategoryOptionsLink.initModel(sequelize),
  ItemCategoryOption: ItemCategoryOption.initModel(sequelize),
  Tag: Tag.initModel(sequelize),
  ItemTag: ItemTag.initModel(sequelize),
  Project: Project.initModel(sequelize),
  Config: Config.initModel(sequelize),
  UserTypes: UserTypes.initModel(sequelize),
  EsItemSync: EsItemSync.initModel(sequelize),
  Translations: Translations.initModel(sequelize),
  Language: Language.initModel(sequelize),
  LanguageProject: LanguageProject.initModel(sequelize),
  Actions: Actions.initModel(sequelize),
  ActionPrivileges: ActionPrivileges.initModel(sequelize),
  ActionsProject: ActionsProject.initModel(sequelize),
  CategoryActions: CategoryActions.initModel(sequelize),
  Privileges: Privileges.initModel(sequelize),
  PrivilegesProject: PrivilegesProject.initModel(sequelize),
  Roles: Roles.initModel(sequelize),
  RolesProject: RolesProject.initModel(sequelize),
  UserRoles: UserRoles.initModel(sequelize),
  UserTypeRoles: UserTypeRoles.initModel(sequelize),
  DimensionsProject: DimensionsProject.initModel(sequelize),
  Dimensions: Dimensions.initModel(sequelize),
  V_Project: vProject.initModel(sequelize),
  MailParts: MailParts.initModel(sequelize),
  MailSenders: MailSenders.initModel(sequelize),
  MailTypes: MailTypes.initModel(sequelize),
  MailTypesProjects: MailTypesProjects.initModel(sequelize),
  Seos: Seos.initModel(sequelize),
  V_Category: V_Category.initModel(sequelize),
  ItemUserAction: ItemUserAction.initModel(sequelize),
  ItemTransactionCategoryOptions: ItemTransactionCategoryOptions.initModel(sequelize),
  ItemTransaction: ItemTransaction.initModel(sequelize),
  Conversation: Conversation.initModel(sequelize),
  UserConversation: UserConversation.initModel(sequelize),
  ConversationMessages: ConversationMessages.initModel(sequelize),
  ConversationMessageMembers: ConversationMessageMembers.initModel(sequelize),
  Status: Status.initModel(sequelize),
  StatusActions: StatusActions.initModel(sequelize),
  StatusProjects: StatusProjects.initModel(sequelize),
  ItemCategoryOptionTerm: ItemCategoryOptionTerm.initModel(sequelize),
  Comment: Comment.initModel(sequelize),
  Invoice: Invoice.initModel(sequelize),
  InvoiceUser: InvoiceUser.initModel(sequelize),
  InvoiceItem: InvoiceItem.initModel(sequelize),
  UserInvoiceValue: UserInvoiceValue.initModel(sequelize),
  ProcessChain: ProcessChain.initModel(sequelize),
  Process: Process.initModel(sequelize),
  ProcessChainState: ProcessChainState.initModel(sequelize),
  ItemProcessState: ItemProcessState.initModel(sequelize),
  ProcessChainActionInjection: ProcessChainActionInjection.initModel(sequelize),
  ProcessChainPrivilege: ProcessChainPrivilege.initModel(sequelize),
  CmsElementsProject: CmsElementsProject.initModel(sequelize),
  CmsMenuItemsPrivilegesProjects: CmsMenuItemsPrivilegesProjects.initModel(sequelize),
  CmsMenuItemsProjects: CmsMenuItemsProjects.initModel(sequelize),
  CmsMenuProjects: CmsMenuProjects.initModel(sequelize),
  CmsPageProjects: CmsPagesProjects.initModel(sequelize),
  CmsPagePrivilegesProjects: CmsPagePrivilegesProjects.initModel(sequelize),
};

Object.keys(models).forEach(modelName => {
  const model: any = models[modelName as keyof IMappsDbModels];
  if (model.associate) {
    //ts-disable
    model.associate(models);
  }
  if (model.hooks) {
    //ts-disable
    model.hooks(models, sequelize);
  }
});

const SequelizeDB = { ...models, ...db };

export default SequelizeDB;