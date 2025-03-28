import ActionPrivileges from "./actions/actionPrivileges";
import Actions from "./actions/actions";
import ActionsProject from "./actions/actionsProject";
import Blob from "./blob/blob";
import BlobMapper from "./blob/blobMapper";
import Category from "./category/category";
import CategoryActions from "./category/categoryActions";
import CategoryHierarchy from "./category/categoryHierarchy";
import CategoryOption from "./category/categoryOption";
import CategoryOptionsLink from "./category/categoryOptionsLink";
import CategoryOptionsTemplate from "./category/categoryOptionsTemplate";
import CategoryOptionsType from "./category/categoryOptionsType";
import CategoryOptionsTypeTemplate from "./category/categoryOptionsTypeTemplate";
import CmsElementsProject from "./cms/cmsElementsProjects";
import CmsMenuItemsPrivilegesProjects from "./cms/cmsMenuItemsPrivilegesProjects";
import CmsMenuItemsProjects from "./cms/cmsMenuItemsProjects";
import CmsMenuProjects from "./cms/cmsMenuProjects";
import CmsPagePrivilegesProjects from "./cms/cmsPagePrivilegesProjects";
import CmsPagesProjects from "./cms/cmsPagesProjects";
import Comment from "./comments/comments";
import Config from "./config/config";
import Conversation from "./conversation/conversation";
import ConversationMessages from "./conversation/conversationMessages";
import ConversationMessageMembers from "./conversation/conversationMessagesMembers";
import Country from "./location/country";
import Dimensions from "./dimensions/dimensions";
import DimensionsProject from "./dimensions/dimensionsProject";
import EsItemSync from "./sync/esItemSync";
import Invoice from "./invoice/invoices";
import InvoiceItem from "./invoice/invoicesItems";
import InvoiceUser from "./invoice/invoicesUsers";
import Item from "./item/item";
import ItemCategory from "./item/itemCategory";
import ItemCategoryOption from "./item/itemCategoryOption";
import ItemCategoryOptionTerm from "./item/itemCategoryOptionTerm";
import ItemProcessState from "./item/itemProcessState";
import ItemTag from "./item/itemTag";
import ItemTransaction from "./item/itemTransaction";
import ItemTransactionCategoryOptions from "./item/itemTransactionCategoryOptions";
import ItemUserAction from "./item/itemUserAction";
import Language from "./language/language";
import LanguageProject from "./language/languageProject";
import City from "./location/city";
import MailParts from "./mail/mailParts";
import MailSenders from "./mail/mailSenders";
import MailTypes from "./mail/mailTypes";
import MailTypesProjects from "./mail/mailTypesProject";
import Privileges from "./privileges";
import PrivilegesProject from "./privilegesProject";
import Process from "./process";
import ProcessChain from "./processChain";
import ProcessChainActionInjection from "./processChainActionInjection";
import ProcessChainPrivilege from "./processChainPrivilege";
import ProcessChainState from "./processChainState";
import Project from "./project";
import Roles from "./roles";
import RolesProject from "./rolesProject";
import Seos from "./seos";
import Status from "./status";
import StatusActions from "./statusActions";
import StatusProjects from "./statusProjects";
import Tag from "./tag";
import Translations from "./translations";
import Users from "./user";
import UserAuths from "./userauth";
import UserConversation from "./userconversation";
import UserInvoiceValue from "./userInvoicesValue";
import UserRoles from "./userRoles";
import UserTypeRoles from "./userTypeRoles";
import UserTypes from "./userTypes";
import V_Category from "./v_category";
import vProject from "./v_project";
import vUser from "./v_user";

export interface MappsDbModels {
    Users: ReturnType<typeof Users.initModel>;
    Category: ReturnType<typeof Category.initModel>;
    CategoryHierarchy: ReturnType<typeof CategoryHierarchy.initModel>;
    BlobMapper: ReturnType<typeof BlobMapper.initModel>;
    Item: ReturnType<typeof Item.initModel>;
    ItemCategory: ReturnType<typeof ItemCategory.initModel>;
    Blob: ReturnType<typeof Blob.initModel>;
    V_User: ReturnType<typeof vUser.initModel>;
    Country: ReturnType<typeof Country.initModel>;
    City: ReturnType<typeof City.initModel>;
    UserAuths: ReturnType<typeof UserAuths.initModel>;
    CategoryOptionsType: ReturnType<typeof CategoryOptionsType.initModel>;
    CategoryOptionsTypeTemplate: ReturnType<typeof CategoryOptionsTypeTemplate.initModel>;
    CategoryOptionsTemplate: ReturnType<typeof CategoryOptionsTemplate.initModel>;
    CategoryOption: ReturnType<typeof CategoryOption.initModel>;
    CategoryOptionsLink: ReturnType<typeof CategoryOptionsLink.initModel>;
    ItemCategoryOption: ReturnType<typeof ItemCategoryOption.initModel>;
    Tag: ReturnType<typeof Tag.initModel>;
    ItemTag: ReturnType<typeof ItemTag.initModel>;
    Project: ReturnType<typeof Project.initModel>;
    Config: ReturnType<typeof Config.initModel>;
    UserTypes: ReturnType<typeof UserTypes.initModel>;
    EsItemSync: ReturnType<typeof EsItemSync.initModel>;
    Translations: ReturnType<typeof Translations.initModel>;
    Language: ReturnType<typeof Language.initModel>;
    LanguageProject: ReturnType<typeof LanguageProject.initModel>;
    Actions: ReturnType<typeof Actions.initModel>;
    ActionPrivileges: ReturnType<typeof ActionPrivileges.initModel>;
    ActionsProject: ReturnType<typeof ActionsProject.initModel>;
    CategoryActions: ReturnType<typeof CategoryActions.initModel>;
    Privileges: ReturnType<typeof Privileges.initModel>;
    PrivilegesProject: ReturnType<typeof PrivilegesProject.initModel>;
    Roles: ReturnType<typeof Roles.initModel>;
    RolesProject: ReturnType<typeof RolesProject.initModel>;
    UserRoles: ReturnType<typeof UserRoles.initModel>;
    UserTypeRoles: ReturnType<typeof UserTypeRoles.initModel>;
    DimensionsProject: ReturnType<typeof DimensionsProject.initModel>;
    Dimensions: ReturnType<typeof Dimensions.initModel>;
    V_Project: ReturnType<typeof vProject.initModel>;
    MailParts: ReturnType<typeof MailParts.initModel>;
    MailSenders: ReturnType<typeof MailSenders.initModel>;
    MailTypes: ReturnType<typeof MailTypes.initModel>;
    MailTypesProjects: ReturnType<typeof MailTypesProjects.initModel>;
    Seos: ReturnType<typeof Seos.initModel>;
    V_Category: ReturnType<typeof V_Category.initModel>;
    ItemUserAction: ReturnType<typeof ItemUserAction.initModel>;
    ItemTransactionCategoryOptions: ReturnType<typeof ItemTransactionCategoryOptions.initModel>;
    ItemTransaction: ReturnType<typeof ItemTransaction.initModel>;
    Conversation: ReturnType<typeof Conversation.initModel>;
    UserConversation: ReturnType<typeof UserConversation.initModel>;
    ConversationMessages: ReturnType<typeof ConversationMessages.initModel>;
    ConversationMessageMembers: ReturnType<typeof ConversationMessageMembers.initModel>;
    Status: ReturnType<typeof Status.initModel>;
    StatusActions: ReturnType<typeof StatusActions.initModel>;
    StatusProjects: ReturnType<typeof StatusProjects.initModel>;
    ItemCategoryOptionTerm: ReturnType<typeof ItemCategoryOptionTerm.initModel>;
    Comment: ReturnType<typeof Comment.initModel>;
    Invoice: ReturnType<typeof Invoice.initModel>;
    InvoiceUser: ReturnType<typeof InvoiceUser.initModel>;
    InvoiceItem: ReturnType<typeof InvoiceItem.initModel>;
    UserInvoiceValue: ReturnType<typeof UserInvoiceValue.initModel>;
    ProcessChain: ReturnType<typeof ProcessChain.initModel>;
    Process: ReturnType<typeof Process.initModel>;
    ProcessChainState: ReturnType<typeof ProcessChainState.initModel>;
    ItemProcessState: ReturnType<typeof ItemProcessState.initModel>;
    ProcessChainActionInjection: ReturnType<typeof ProcessChainActionInjection.initModel>;
    ProcessChainPrivilege: ReturnType<typeof ProcessChainPrivilege.initModel>;
    CmsElementsProject: ReturnType<typeof CmsElementsProject.initModel>;
    CmsMenuItemsPrivilegesProjects: ReturnType<typeof CmsMenuItemsPrivilegesProjects.initModel>;
    CmsMenuItemsProjects: ReturnType<typeof CmsMenuItemsProjects.initModel>;
    CmsMenuProjects: ReturnType<typeof CmsMenuProjects.initModel>;
    CmsPageProjects: ReturnType<typeof CmsPagesProjects.initModel>;
    CmsPagePrivilegesProjects: ReturnType<typeof CmsPagePrivilegesProjects.initModel>;
  }