"use strict";

//var fs = require('fs');
//var path = require('path');

//var basename = path.basename(__filename);
import Sequelize from "sequelize";
import * as configJSON from "./../config/config.json";
import Users from "./user.js";
import Category from "./category.js";
import CategoryHierarchy from "./categoryhierarchy.js";
import Blob from "./blob.js";
import BlobMapper from "./blobMapper.js";
import Item from "./item.js";
import ItemCategory from "./itemcategory.js";
import V_User from "./v_user.js";
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
import RolesProject from "./RolesProject";
import UserRoles from "./userRoles";
import UserTypeRoles from "./userTypeRoles";
import Dimensions from "./dimensions";
import DimensionsProject from './dimensionsProject'
import V_Project from "./v_project";



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
  V_User: V_User.init(sequelize, Sequelize),
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
  V_Project: V_Project.init(sequelize, Sequelize)


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
