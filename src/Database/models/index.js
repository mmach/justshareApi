"use strict";

//var fs = require('fs');
//var path = require('path');

//var basename = path.basename(__filename);
import Sequelize from "sequelize";
import { DBConfig } from "./../config/config.js"
import Users from "./user";
import Category from "./category";
import CategoryHierarchy from "./categoryHierarchy";
import Blob from "./blob";
import BlobMapper from "./blobMapper";
import Item from "./item";
import ItemCategory from "./itemCategory";
import vUser from "./v_user";
import Country from "./country";
import City from "./city";
import UserAuths from "./userauth";
import CategoryOption from "./categoryOption";
import CategoryOptionsTemplate from "./categoryOptionsTemplate";
import CategoryOptionsTypeTemplate from "./categoryOptionsTypeTemplate";
import CategoryOptionsType from "./categoryOptionsType";
import CategoryOptionsLink from "./categoryOptionsLink";
import ItemCategoryOption from "./itemCategoryOption";
import Tag from "./tag";
import ItemTag from "./itemTag";
import Project from "./project";
import Config from './config';
import EsItemSync from './esItemSync'
import Translations from "./translations";
import Language from "./language";
import LanguageProject from "./languageProject";
import Actions from "./actions";
import ActionPrivileges from "./actionPrivileges";
import ActionsProject from "./actionsProject";
import CategoryActions from "./categoryActions";
import Privileges from "./privileges";
import PrivilegesProject from "./privilegesProject";
import UserTypes from './userTypes'
import Roles from "./roles";
import RolesProject from "./rolesProject";
import UserRoles from "./userRoles";
import UserTypeRoles from "./userTypeRoles";
import Dimensions from "./dimensions";
import DimensionsProject from './dimensionsProject'
import vProject from "./v_project";
import MailParts from "./mailParts";
import MailSenders from "./mailSenders";
import MailTypes from "./mailTypes";
import MailTypesProjects from "./mailTypesProject";
import Seos from "./seos";
import V_Category from "./v_category";
import ItemUserAction from "./itemUserAction";
import ItemTransactionCategoryOptions from "./itemTransactionCategoryOptions";
import ItemTransaction from './itemTransaction'
import Conversation from "./conversation";
import UserConversation from "./userconversation";
import ConversationMessages from "./conversationMessages";
import ConversationMessageMembers from "./conversationMessagesMembers";
import Status from "./status";
import StatusActions from "./statusActions";
import StatusProjects from "./statusProjects";
import ItemCategoryOptionTerm from "./itemCategoryOptionTerm";
import Comment from "./comments";
import Invoice from './invoices'
import InvoiceUser from "./invoicesUsers";
import InvoiceItem from "./invoicesItems";
import UserInvoiceValue from "./userInvoicesValue";
import ProcessChain from "./processChain";
import Process from "./process";
import ProcessChainState from "./processChainState";
import ItemProcessState from "./itemProcessState";
import ProcessChainPrivilege from "./processChainPrivilege";
import ProcessChainActionInjection from "./processChainActionInjection";
import CmsElementsProject from "./cmsElementsProjects";
import CmsMenuItemsPrivilegesProjects from "./cmsMenuItemsPrivilegesProjects";
import CmsMenuItemsProjects from "./cmsMenuItemsProjects";
import CmsMenuProjects from "./cmsMenuProjects";
import CmsPageProjects from "./cmsPagesProjects";
import CmsPagePrivilegesProjects from "./cmsPagePrivilegesProjects";


var env = process.env.NODE_ENV || "development";
var config = DBConfig[env];
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
/*
let models = {
  Blob: require('./blob'),
  BlobMapper: reqsuire('./blobMapper'),
  Category: require('./category'),
  CategoryHierarchy: require('./categoryhierarchy'),
  Conversation: require('./conversation'),
  ConversationMessages: require('./conversationmessages'),
  Item: require('./item'),
  ItemCategory: require('./itemcategory'),
  User: require('./user'),
  UserAuth: require('./userauth'),
  UserConversation: require('./userconversation'),
};*/
let db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

let models = {
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
  CmsPagePrivilegesProjects: CmsPagePrivilegesProjects.initModel(sequelize)
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
  if (models[modelName].hooks) {
    models[modelName].hooks(models, sequelize);
  }
});
let SequelizeDB = { ...models, ...db };

export default SequelizeDB;

/*
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {

    models[modelName].associate(models);
  }
});

*/
//////        https://www.duringthedrive.com/2017/05/06/models-migrations-sequelize-node/

/*
 ./../../node_modules/.bin/sequelize model:generate --name UserTable --attributes name:string,surname:string,email:string,salt:string,phone:string,birthDa
te:date,uid:uuid,isAuthorize:boolean,passwordHash:string,blob_id:integer,city:string,city_id:integer,adress:string,country:string,country_id:integer,longitude:float,latitude:float

 ./../../node_modules/.bin/sequelize model:generate --name UserTable --attributes name:string,surname:string,email:string,salt:string,phone:string,birthDa
te:date,uid:uuid,isAuthorize:boolean,passwordHash:string,blob_id:integer,city:string,city_id:integer,adress:string,country:string,country_id:integer,longitude:float,latitude:float

./../../node_modules/.bin/sequelize model:generate --name User --attributes name:string,surname:string,email:string,salt:string,phone:string,birthDate:da
te,uid:uuid,isAuthorize:boolean,passwordHash:string,blob_id:integer,city:string,city_id:integer,adress:string,country:string,country_id:integer,longitude:float,latitude:float

./../../node_modules/.bin/sequelize model:generate --name Item --attributes name:string,description:string,user_Id:integer,clobSearch:string,clobSearch_pl:string,clobSearch_us:string




PS F:\Private\cqrs-node\src\_db> ./../../node_modules/.bin/sequelize model:generate --name ItemBlob --attributes blob_id:integer,item_id:int,blob_id_thumbmail:integer

model:generate --name ItemCategory --attributes item_id:integer,category_id:integer
./../../node_modules/.bin/sequelize model:generate --name Category --attributes category:string,category_pl:integer,category_us:string

*/
