'use strict';

import { Sequelize } from "sequelize";
import { DBConfig } from "../config/config.js";
import Users from "./user.js";
import Category from "./category.js";
import CategoryHierarchy from "./categoryHierarchy.js";
import Blob from "./blob.js";
import BlobMapper from "./blobMapper.js";
import Item from "./item.js";
import ItemCategory from "./itemCategory.js";
import vUser from "./v_user.js";
import Country from "./country.js";
import City from "./city.js";
import UserAuths from "./userauth.js";
import CategoryOption from "./categoryOption.js";
import CategoryOptionsTemplate from "./categoryOptionsTemplate.js";
import CategoryOptionsTypeTemplate from "./categoryOptionsTypeTemplate.js";
import CategoryOptionsType from "./categoryOptionsType.js";
import CategoryOptionsLink from "./categoryOptionsLink.js";
import ItemCategoryOption from "./itemCategoryOption.js";
import Tag from "./tag.js";
import ItemTag from "./itemTag.js";
import Project from "./project.js";
import Config from './config.js';
import EsItemSync from './esItemSync.js';
import Translations from "./translations.js";
import Language from "./language.js";
import LanguageProject from "./languageProject.js";
import Actions from "./actions.js";
import ActionPrivileges from "./actionPrivileges.js";
import ActionsProject from "./actionsProject.js";
import CategoryActions from "./categoryActions.js";
import Privileges from "./privileges.js";
import PrivilegesProject from "./privilegesProject.js";
import UserTypes from './userTypes.js';
import Roles from "./roles.js";
import RolesProject from "./rolesProject.js";
import UserRoles from "./userRoles.js";
import UserTypeRoles from "./userTypeRoles.js";
import Dimensions from "./dimensions.js";
import DimensionsProject from './dimensionsProject.js';
import vProject from "./v_project.js";
import MailParts from "./mailParts.js";
import MailSenders from "./mailSenders.js";
import MailTypes from "./mailTypes.js";
import MailTypesProjects from "./mailTypesProject.js";
import Seos from "./seos.js";
import V_Category from "./v_category.js";
import ItemUserAction from "./itemUserAction.js";
import ItemTransactionCategoryOptions from "./itemTransactionCategoryOptions.js";
import ItemTransaction from './itemTransaction.js';
import Conversation from "./conversation.js";
import UserConversation from "./userconversation.js";
import ConversationMessages from "./conversationMessages.js";
import ConversationMessageMembers from "./conversationMessagesMembers.js";
import Status from "./status.js";
import StatusActions from "./statusActions.js";
import StatusProjects from "./statusProjects.js";
import ItemCategoryOptionTerm from "./itemCategoryOptionTerm.js";
import Comment from "./comments.js";
import Invoice from './invoices.js';
import InvoiceUser from "./invoicesUsers.js";
import InvoiceItem from "./invoicesItems.js";
import UserInvoiceValue from "./userInvoicesValue.js";
import ProcessChain from "./processChain.js";
import Process from "./process.js";
import ProcessChainState from "./processChainState.js";
import ItemProcessState from "./itemProcessState.js";
import ProcessChainPrivilege from "./processChainPrivilege.js";
import ProcessChainActionInjection from "./processChainActionInjection.js";
import CmsElementsProject from "./cmsElementsProjects.js";
import CmsMenuItemsPrivilegesProjects from "./cmsMenuItemsPrivilegesProjects.js";
import CmsMenuItemsProjects from "./cmsMenuItemsProjects.js";
import CmsMenuProjects from "./cmsMenuProjects.js";
import CmsPageProjects from "./cmsPagesProjects.js";
import CmsPagePrivilegesProjects from "./cmsPagePrivilegesProjects.js";
import { MappsDbModels } from "./models.js";

const env = process.env.NODE_ENV || "development";
const config = (DBConfig as any)[env];
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] as string, config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {
  sequelize,
  Sequelize,
};

const models: MappsDbModels = {
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
  CmsPageProjects: CmsPageProjects.initModel(sequelize),
  CmsPagePrivilegesProjects: CmsPagePrivilegesProjects.initModel(sequelize),
};

Object.keys(models).forEach(modelName => {
  const model = (models as any)[modelName];
  if (model.associate) {
    model.associate(models);
  }
  if (model.hooks) {
    model.hooks(models, sequelize);
  }
});

const SequelizeDB = { ...models, ...db };

export default SequelizeDB;