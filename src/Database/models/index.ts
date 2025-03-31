'use strict';

import { Sequelize } from "sequelize";
import { DBConfig } from "../config/config";
import Users from "./user/user";
import Category from "./category/category";
import CategoryHierarchy from "./category/categoryHierarchy";
import Blob from "./blob/blob";
import BlobMapper from "./blob/blobMapper";
import Item from "./item/item";
import ItemCategory from "./item/itemCategory";
import vUser from "./user/v_user";
import Country from "./location/country";
import City from "./location/city";
import UserAuths from "./user/userauth";
import CategoryOption from "./category/categoryOption";
import CategoryOptionsTemplate from "./category/categoryOptionsTemplate";
import CategoryOptionsTypeTemplate from "./category/categoryOptionsTypeTemplate";
import CategoryOptionsType from "./category/categoryOptionsType";
import CategoryOptionsLink from "./category/categoryOptionsLink";
import ItemCategoryOption from "./item/itemCategoryOption";
import Tag from "./tag/tag";
import ItemTag from "./item/itemTag";
import Project from "./project/project";
import Config from './config/config';
import EsItemSync from './sync/esItemSync';
import Translations from "./translations/translations";
import Language from "./language/language";
import LanguageProject from "./language/languageProject";
import Actions from "./actions/actions";
import ActionPrivileges from "./actions/actionPrivileges";
import ActionsProject from "./actions/actionsProject";
import CategoryActions from "./category/categoryActions";
import Privileges from "./privileges/privileges";
import PrivilegesProject from "./privileges/privilegesProject";
import UserTypes from './user/userTypes';
import Roles from "./roles/roles";
import RolesProject from "./roles/rolesProject";
import UserRoles from "./user/userRoles";
import UserTypeRoles from "./user/userTypeRoles";
import Dimensions from "./dimensions/dimensions";
import DimensionsProject from './dimensions/dimensionsProject';
import vProject from "./project/v_project";
import MailParts from "./mail/mailParts";
import MailSenders from "./mail/mailSenders";
import MailTypes from "./mail/mailTypes";
import MailTypesProjects from "./mail/mailTypesProject";
import Seos from "./seo/seos";
import V_Category from "./category/v_category";
import ItemUserAction from "./item/itemUserAction";
import ItemTransactionCategoryOptions from "./item/itemTransactionCategoryOptions";
import ItemTransaction from './item/itemTransaction';
import Conversation from "./conversation/conversation";
import UserConversation from "./user/userconversation";
import ConversationMessages from "./conversation/conversationMessages";
import ConversationMessageMembers from "./conversation/conversationMessagesMembers";
import Status from "./status/status";
import StatusActions from "./status/statusActions";
import StatusProjects from "./status/statusProjects";
import ItemCategoryOptionTerm from "./item/itemCategoryOptionTerm";
import Comment from "./comments/comments";
import Invoice from './invoice/invoices';
import InvoiceUser from "./invoice/invoicesUsers";
import InvoiceItem from "./invoice/invoicesItems";
import UserInvoiceValue from "./user/userInvoicesValue";
import ProcessChain from "./process/processChain";
import Process from "./process/process";
import ProcessChainState from "./process/processChainState";
import ItemProcessState from "./item/itemProcessState";
import ProcessChainPrivilege from "./process/processChainPrivilege";
import ProcessChainActionInjection from "./process/processChainActionInjection";
import { MappsDbModels } from "./models";
import CmsElementsProject from "./cms/cmsElementsProjects";
import CmsMenuItemsPrivilegesProjects from "./cms/cmsMenuItemsPrivilegesProjects";
import CmsMenuItemsProjects from "./cms/cmsMenuItemsProjects";
import CmsMenuProjects from "./cms/cmsMenuProjects";
import CmsPagePrivilegesProjects from "./cms/cmsPagePrivilegesProjects";
import CmsPagesProjects from "./cms/cmsPagesProjects";

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
  CmsPageProjects: CmsPagesProjects.initModel(sequelize),
  CmsPagePrivilegesProjects: CmsPagePrivilegesProjects.initModel(sequelize),
};

Object.keys(models).forEach(modelName => {
  const model: any = models[modelName as keyof MappsDbModels];
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