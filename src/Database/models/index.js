"use strict";

//var fs = require('fs');
//var path = require('path');

//var basename = path.basename(__filename);
import Sequelize from "sequelize";
import { DBConfig } from "./../config/config.js"
import Users from "./user.js";
import Category from "./category";
import CategoryHierarchy from "./categoryHierarchy";
import Blob from "./blob";
import BlobMapper from "./blobMapper";
import Item from "./item";
import ItemCategory from "./itemCategory";
import vUser from "./v_user.js";
import Country from "./country";
import City from "./city";
import UserAuths from "./userauth.js";
import CategoryOption from "./categoryOption";
import CategoryOptionsTemplate from "./categoryOptionsTemplate";
import CategoryOptionsTypeTemplate from "./categoryOptionsTypeTemplate";
import CategoryOptionsType from "./categoryOptionsType";
import CategoryOptionsLink from "./categoryOptionsLink";
import ItemCategoryOption from "./itemCategoryOption";
import Tag from "./tag.js";
import ItemTag from "./itemTag";
import Project from "./project.js";
import Config from './config';
import EsItemSync from './esItemSync'
import Translations from "./translations.js";
import Language from "./language";
import LanguageProject from "./languageProject";
import Actions from "./actions";
import ActionPrivileges from "./actionPrivileges";
import ActionsProject from "./actionsProject";
import CategoryActions from "./categoryActions";
import Privileges from "./privileges";
import PrivilegesProject from "./privilegesProject";
import UserTypes from './userTypes.js'
import Roles from "./roles.js";
import RolesProject from "./rolesProject.js";
import UserRoles from "./userRoles.js";
import UserTypeRoles from "./userTypeRoles.js";
import Dimensions from "./dimensions";
import DimensionsProject from './dimensionsProject'
import vProject from "./v_project.js";
import MailParts from "./mailParts";
import MailSenders from "./mailSenders";
import MailTypes from "./mailTypes";
import MailTypesProjects from "./mailTypesProject";
import Seos from "./seos.js";
import V_Category from "./v_category.js";
import ItemUserAction from "./itemUserAction";
import ItemTransactionCategoryOptions from "./itemTransactionCategoryOptions";
import ItemTransaction from './itemTransaction'
import Conversation from "./conversation";
import UserConversation from "./userconversation.js";
import ConversationMessages from "./conversationMessages";
import ConversationMessageMembers from "./conversationMessagesMembers";
import Status from "./status.js";
import StatusActions from "./statusActions.js";
import StatusProjects from "./statusProjects.js";
import ItemCategoryOptionTerm from "./itemCategoryOptionTerm";
import Comment from "./comments";
import Invoice from './invoices'
import InvoiceUser from "./invoicesUsers";
import InvoiceItem from "./invoicesItems";
import UserInvoiceValue from "./userInvoicesValue.js";
import ProcessChain from "./processChain";
import Process from "./process";
import ProcessChainState from "./processChainState.js";
import ItemProcessState from "./itemProcessState";
import ProcessChainPrivilege from "./processChainPrivilege.js";
import ProcessChainActionInjection from "./processChainActionInjection.js";
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
  Users: Users.init(sequelize, Sequelize),
  Category: Category.initModel(sequelize),
  CategoryHierarchy: CategoryHierarchy.initModel(sequelize),
  BlobMapper: BlobMapper.initModel(sequelize),
  Item: Item.initModel(sequelize),
  ItemCategory: ItemCategory.initModel(sequelize),
  Blob: Blob.initModel(sequelize),
  V_User: vUser.init(sequelize, Sequelize),
  Country: Country.initModel(sequelize),
  City: City.initModel(sequelize),
  UserAuths: UserAuths.init(sequelize, Sequelize),
  CategoryOptionsType: CategoryOptionsType.initModel(sequelize),
  CategoryOptionsTypeTemplate: CategoryOptionsTypeTemplate.initModel(sequelize),
  CategoryOptionsTemplate: CategoryOptionsTemplate.initModel(sequelize),
  CategoryOption: CategoryOption.initModel(sequelize),
  CategoryOptionsLink: CategoryOptionsLink.initModel(sequelize),
  ItemCategoryOption: ItemCategoryOption.initModel(sequelize),
  Tag: Tag.init(sequelize, Sequelize),
  ItemTag: ItemTag.initModel(sequelize),
  Project: Project.init(sequelize, Sequelize),
  Config: Config.initModel(sequelize),
  UserTypes: UserTypes.init(sequelize, Sequelize),
  EsItemSync: EsItemSync.initModel(sequelize),
  Translations: Translations.init(sequelize, Sequelize),
  Language: Language.initModel(sequelize),
  LanguageProject: LanguageProject.initModel(sequelize),
  Actions: Actions.initModel(sequelize),
  ActionPrivileges: ActionPrivileges.initModel(sequelize),
  ActionsProject: ActionsProject.initModel(sequelize),
  CategoryActions: CategoryActions.initModel(sequelize),
  Privileges: Privileges.initModel(sequelize),
  PrivilegesProject: PrivilegesProject.initModel(sequelize),
  Roles: Roles.init(sequelize, Sequelize),
  RolesProject: RolesProject.init(sequelize, Sequelize),
  UserRoles: UserRoles.init(sequelize, Sequelize),
  UserTypeRoles: UserTypeRoles.init(sequelize, Sequelize),
  DimensionsProject: DimensionsProject.initModel(sequelize),
  Dimensions: Dimensions.initModel(sequelize),
  V_Project: vProject.init(sequelize, Sequelize),
  MailParts: MailParts.initModel(sequelize),
  MailSenders: MailSenders.initModel(sequelize),
  MailTypes: MailTypes.initModel(sequelize),
  MailTypesProjects: MailTypesProjects.initModel(sequelize),
  Seos: Seos.init(sequelize, Sequelize),
  V_Category: V_Category.init(sequelize, Sequelize),
  ItemUserAction: ItemUserAction.initModel(sequelize),
  ItemTransactionCategoryOptions: ItemTransactionCategoryOptions.initModel(sequelize),
  ItemTransaction: ItemTransaction.initModel(sequelize),
  Conversation: Conversation.initModel(sequelize),
  UserConversation: UserConversation.init(sequelize, Sequelize),
  ConversationMessages: ConversationMessages.initModel(sequelize),
  ConversationMessageMembers: ConversationMessageMembers.initModel(sequelize),
  Status: Status.init(sequelize, Sequelize),
  StatusActions: StatusActions.init(sequelize, Sequelize),
  StatusProjects: StatusProjects.init(sequelize, Sequelize),
  ItemCategoryOptionTerm: ItemCategoryOptionTerm.initModel(sequelize),
  Comment: Comment.initModel(sequelize),
  Invoice: Invoice.initModel(sequelize),
  InvoiceUser: InvoiceUser.initModel(sequelize),
  InvoiceItem: InvoiceItem.initModel(sequelize),
  UserInvoiceValue: UserInvoiceValue.init(sequelize, Sequelize),
  ProcessChain: ProcessChain.initModel(sequelize),
  Process: Process.initModel(sequelize),
  ProcessChainState: ProcessChainState.init(sequelize, Sequelize),
  ItemProcessState: ItemProcessState.initModel(sequelize),
  ProcessChainActionInjection: ProcessChainActionInjection.init(sequelize, Sequelize),
  ProcessChainPrivilege: ProcessChainPrivilege.init(sequelize, Sequelize),
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
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
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
