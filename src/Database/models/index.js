"use strict";

//var fs = require('fs');
//var path = require('path');

//var basename = path.basename(__filename);
import Sequelize from "sequelize";
import configJSON from "./../config/config.json" assert {type: 'json'};
import Users from "./user.js";
import Category from "./category.js";
import CategoryHierarchy from "./categoryhierarchy.js";
import Blob from "./blob.js";
import BlobMapper from "./blobMapper.js";
import Item from "./item.js";
import ItemCategory from "./itemcategory.js";
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
import EsItemSync from './esItemSync.js'
import Translations from "./translations.js";
import Language from "./language.js";
import LanguageProject from "./languageProject.js";
import Actions from "./actions.js";
import ActionPrivileges from "./actionPrivileges.js";
import ActionsProject from "./actionsProject.js";
import CategoryActions from "./categoryActions.js";
import Privileges from "./privileges.js";
import PrivilegesProject from "./privilegesProject.js";
import UserTypes from './userTypes.js'
import Roles from "./roles.js";
import RolesProject from "./rolesProject.js";
import UserRoles from "./userRoles.js";
import UserTypeRoles from "./userTypeRoles.js";
import Dimensions from "./dimensions.js";
import DimensionsProject from './dimensionsProject.js'
import vProject from "./v_project.js";
import MailParts from "./mailParts.js";
import MailSenders from "./mailSenders.js";
import MailTypes from "./mailTypes.js";
import MailTypesProjects from "./mailTypesProject.js";
import Seos from "./seos.js";
import V_Category from "./v_category.js";
import ItemUserAction from "./itemUserAction.js";
import ItemTransactionCategoryOptions from "./itemTransactionCategoryOptions.js";
import ItemTransaction from './itemTransaction.js'
import Conversation from "./conversation.js";
import UserConversation from "./userconversation.js";
import ConversationMessages from "./conversationmessages.js";
import ConversationMessageMembers from "./conversationmessagesmembers.js";
import Status from "./status.js";
import StatusActions from "./statusActions.js";
import StatusProjects from "./statusProjects.js";
import ItemCategoryOptionTerm from "./itemCategoryOptionTerm.js";
import Comment from "./comments.js";
import Invoice from './invoices.js'
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


var env = process.env.NODE_ENV || "development";
var config = configJSON[env];
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
  Category: Category.init(sequelize, Sequelize),
  CategoryHierarchy: CategoryHierarchy.init(sequelize, Sequelize),
  BlobMapper: BlobMapper.init(sequelize, Sequelize),
  Item: Item.init(sequelize, Sequelize),
  ItemCategory: ItemCategory.init(sequelize, Sequelize),
  Blob: Blob.init(sequelize, Sequelize),
  V_User: vUser.init(sequelize, Sequelize),
  Country: Country.init(sequelize, Sequelize),
  City: City.init(sequelize, Sequelize),
  UserAuths: UserAuths.init(sequelize, Sequelize),
  CategoryOptionsType: CategoryOptionsType.init(sequelize, Sequelize),
  CategoryOptionsTypeTemplate: CategoryOptionsTypeTemplate.init(sequelize, Sequelize),
  CategoryOptionsTemplate: CategoryOptionsTemplate.init(sequelize, Sequelize),
  CategoryOption: CategoryOption.init(sequelize, Sequelize),
  CategoryOptionsLink: CategoryOptionsLink.init(sequelize, Sequelize),
  ItemCategoryOption: ItemCategoryOption.init(sequelize, Sequelize),
  Tag: Tag.init(sequelize, Sequelize),
  ItemTag: ItemTag.init(sequelize, Sequelize),
  Project: Project.init(sequelize, Sequelize),
  Config: Config.init(sequelize, Sequelize),
  UserTypes: UserTypes.init(sequelize, Sequelize),
  EsItemSync: EsItemSync.init(sequelize, Sequelize),
  Translations: Translations.init(sequelize, Sequelize),
  Language: Language.init(sequelize, Sequelize),
  LanguageProject: LanguageProject.init(sequelize, Sequelize),
  Actions: Actions.init(sequelize, Sequelize),
  ActionPrivileges: ActionPrivileges.init(sequelize, Sequelize),
  ActionsProject: ActionsProject.init(sequelize, Sequelize),
  CategoryActions: CategoryActions.init(sequelize, Sequelize),
  Privileges: Privileges.init(sequelize, Sequelize),
  PrivilegesProject: PrivilegesProject.init(sequelize, Sequelize),
  Roles: Roles.init(sequelize, Sequelize),
  RolesProject: RolesProject.init(sequelize, Sequelize),
  UserRoles: UserRoles.init(sequelize, Sequelize),
  UserTypeRoles: UserTypeRoles.init(sequelize, Sequelize),
  DimensionsProject: DimensionsProject.init(sequelize, Sequelize),
  Dimensions: Dimensions.init(sequelize, Sequelize),
  V_Project: vProject.init(sequelize, Sequelize),
  MailParts: MailParts.init(sequelize, Sequelize),
  MailSenders: MailSenders.init(sequelize, Sequelize),
  MailTypes: MailTypes.init(sequelize, Sequelize),
  MailTypesProjects: MailTypesProjects.init(sequelize, Sequelize),
  Seos: Seos.init(sequelize, Sequelize),
  V_Category: V_Category.init(sequelize, Sequelize),
  ItemUserAction: ItemUserAction.init(sequelize, Sequelize),
  ItemTransactionCategoryOptions: ItemTransactionCategoryOptions.init(sequelize, Sequelize),
  ItemTransaction: ItemTransaction.init(sequelize, Sequelize),
  Conversation: Conversation.init(sequelize, Sequelize),
  UserConversation: UserConversation.init(sequelize, Sequelize),
  ConversationMessages: ConversationMessages.init(sequelize, Sequelize),
  ConversationMessageMembers: ConversationMessageMembers.init(sequelize, Sequelize),
  Status: Status.init(sequelize, Sequelize),
  StatusActions: StatusActions.init(sequelize, Sequelize),
  StatusProjects: StatusProjects.init(sequelize, Sequelize),
  ItemCategoryOptionTerm: ItemCategoryOptionTerm.init(sequelize, Sequelize),
  Comment: Comment.init(sequelize, Sequelize),
  Invoice: Invoice.init(sequelize, Sequelize),
  InvoiceUser: InvoiceUser.init(sequelize, Sequelize),
  InvoiceItem: InvoiceItem.init(sequelize, Sequelize),
  UserInvoiceValue: UserInvoiceValue.init(sequelize, Sequelize),
  ProcessChain: ProcessChain.init(sequelize, Sequelize),
  Process: Process.init(sequelize, Sequelize),
  ProcessChainState: ProcessChainState.init(sequelize, Sequelize),
  ItemProcessState: ItemProcessState.init(sequelize, Sequelize),
  ProcessChainActionInjection: ProcessChainActionInjection.init(sequelize, Sequelize),
  ProcessChainPrivilege: ProcessChainPrivilege.init(sequelize, Sequelize),
  CmsElementsProject: CmsElementsProject.init(sequelize, Sequelize),
  CmsMenuItemsPrivilegesProjects: CmsMenuItemsPrivilegesProjects.init(sequelize, Sequelize),
  CmsMenuItemsProjects: CmsMenuItemsProjects.init(sequelize, Sequelize),
  CmsMenuProjects: CmsMenuProjects.init(sequelize, Sequelize),
  CmsPageProjects: CmsPageProjects.init(sequelize, Sequelize),
  CmsPagePrivilegesProjects: CmsPagePrivilegesProjects.init(sequelize, Sequelize)
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
