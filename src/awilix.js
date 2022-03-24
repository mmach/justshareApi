// @ts-nocheck
"use strict";
import awilix from "awilix";
import { CommandList, ProcessList, QueryList } from "justshare-shared";
import ContainerAwlix from "./Architecture/awilixContainer.js";
import DeleteActionCommand from "./Commands/Actions/deleteActionCommand.js";
import DeleteActionPrivilegesCommand from "./Commands/Actions/deleteActionPrivilegesCommand.js";
import DeleteActionsProjectCommand from "./Commands/Actions/deleteActionsProjectCommand.js";
import UpsertActionCommand from "./Commands/Actions/upsertActionCommand.js";
import UpsertActionPrivilegesCommand from "./Commands/Actions/upsertActionPrivilegesCommand.js";
import UpsertActionsProjectCommand from "./Commands/Actions/upsertActionsProjectCommand.js";
import RemoveBlobCommand from "./Commands/Blob/removeBlobCommand.js";
import UploadBlobToProjectsStorageCommand from "./Commands/Blob/uploadBlobToProjectsStorageCommand.js";
import UploadImageCommand from "./Commands/Blob/uploadImageCommand.js";
import VerifyImageCommand from "./Commands/Blob/verifyImageCommand.js";
import DeleteCategoryCommand from "./Commands/Category/deleteCategoryCommand.js";
import EditCategoryCommand from "./Commands/Category/editCategoryCommand.js";
import InsertCategoryActionCommand from "./Commands/Category/insertCategoryActionCommand.js";
import InsertCategoryCommand from "./Commands/Category/insertCategoryCommand.js";
import RemoveCategoryActionCommand from "./Commands/Category/removeCategoryActionCommand.js";
import SetAsVerifiedCommand from "./Commands/Category/setAsVerifiedCommand.js";
import SetParentCategoryCommand from "./Commands/Category/setParentCategoryCommand.js";
import DeleteCategoryOptionsCommand from "./Commands/CategoryOptions/deleteCategoryOptionsCommand.js";
import DeleteCategoryOptionsForCategoryCommand from "./Commands/CategoryOptions/deleteCategoryOptionsForCategoryCommand.js";
import DeleteCategoryOptionsTemplateCommand from "./Commands/CategoryOptions/deleteCategoryOptionsTemplateCommand.js";
import UpsertCategoryOptionsCommand from "./Commands/CategoryOptions/upsertCategoryOptionsCommand.js";
import UpsertCategoryOptionsForCategoryCommand from "./Commands/CategoryOptions/upsertCategoryOptionsForCategoryCommand.js";
import UpsertCategoryOptionsTemplateCommand from "./Commands/CategoryOptions/upsertCategoryOptionsTemplateCommand.js";
import UpsertConfigCommand from "./Commands/Config/upsertConfigCommand.js";
import AddToDictionaryCommand from "./Commands/Dictionary/addToDictionaryCommand.js";
import RemoveDictionaryCommand from "./Commands/Dictionary/removeDictionaryCommand.js";
import DeleteDimensionCommand from "./Commands/Dimensions/deleteDimensionCommand.js";
import DeleteDimensionProjectCommand from "./Commands/Dimensions/deleteDimensionProjectCommand.js";
import UpsertDimensionCommand from "./Commands/Dimensions/upsertDimensionCommand.js";
import UpsertDimensionProjectCommand from "./Commands/Dimensions/upsertDimensionProjectCommand.js";
import ItemActionsReservationAcceptCommand from "./Commands/Item/Actions/Reservation/itemActionsReservationAcceptCommand.js";
import ItemActionsReservationCancelCommand from "./Commands/Item/Actions/Reservation/itemActionsReservationCancelCommand.js";
import ItemActionsReservationCompleteCommand from "./Commands/Item/Actions/Reservation/itemActionsReservationCompletCommand.js";
import ItemActionsReservationPaidCommand from "./Commands/Item/Actions/Reservation/itemActionsReservationPaidCommand.js";
import ItemActionsReservationRejectCommand from "./Commands/Item/Actions/Reservation/itemActionsReservationRejectCommand.js";
import ItemActionsReservationWaitingForClientCommand from "./Commands/Item/Actions/Reservation/itemActionsReservationWaitingForClientCommand.js";
import ItemActionsReservationWaitingForCustomerCommand from "./Commands/Item/Actions/Reservation/itemActionsReservationWaitingForCustomerCommand.js";
import CreateItemCommand from "./Commands/Item/createItemCommand.js";
import EditItemCommand from "./Commands/Item/editItemCommand.js";
import RemoveItemCommand from "./Commands/Item/removeItemCommand.js";
import ReservationItemCommand from "./Commands/Item/reservationItemCommand.js";
import SetItemSyncCommand from "./Commands/Item/setItemSyncCommand.js";
import SyncItemCommand from "./Commands/Item/syncItemCommand.js";
import DeleteLanguageFromProjectCommand from "./Commands/Language/deleteLanguageFromProjectCommand.js";
import InsertLanguageCommand from "./Commands/Language/insertLanguageCommand.js";
import InsertLanguageToProjectCommand from "./Commands/Language/insertLanguageToProjectCommand.js";
import SetAsMainLanguageCommand from "./Commands/Language/setAsMainLanguageCommand.js";
import UpsertTranslateCommand from "./Commands/Language/upsertTranslateCommand.js";
import RemoveMailPartCommand from "./Commands/Mails/removeMailPartCommand.js";
import RemoveMailSenderCommand from "./Commands/Mails/removeMailSenderCommand.js";
import RemoveMailTypeCommand from "./Commands/Mails/removeMailTypeCommand.js";
import RemoveMailTypeProjectCommand from "./Commands/Mails/removeMailTypeProjectCommand.js";
import UpsertMailPartCommand from "./Commands/Mails/upsertMailPartCommand.js";
import UpsertMailSenderCommand from "./Commands/Mails/upsertMailSenderCommand.js";
import UpsertMailTypeCommand from "./Commands/Mails/upsertMailTypeCommand.js";
import UpsertMailTypeProjectCommand from "./Commands/Mails/upsertMailTypeProjectCommand.js";
import ReadMessageCommand from "./Commands/Messages/readMessageCommand.js";
import SendMessageCommand from "./Commands/Messages/sendMessageCommand.js";
import DeletePrivilegesCommand from "./Commands/Privileges/deletePrivilegesCommand.js";
import DeletePrivilegesProjectCommand from "./Commands/Privileges/deletePrivilegesProjectCommand.js";
import UpsertPrivilegesCommand from "./Commands/Privileges/upsertPrivilegesCommand.js";
import UpsertPrivilegesProjectCommand from "./Commands/Privileges/upsertPrivilegesProjectCommand.js";
import DeleteProcessActionPrivilegeCommand from "./Commands/Process/deleteProcessActionPrivilegeCommand.js";
import DeleteProcessChainElementCommand from "./Commands/Process/deleteProcessChainElementCommand.js";
import DeleteProcessCommand from "./Commands/Process/deleteProcessCommand.js";
import DeleteProcessElementActionCommand from "./Commands/Process/deleteProcessElementActionCommand.js";
import DeleteProcessElementStateCommand from "./Commands/Process/deleteProcessElementStateCommand.js";
import InvokeProcessCommand from "./Commands/Process/invokeProcessCommand.js";
import RunCronQueueCommand from "./Commands/Process/runCronQueueCommand.js";
import UpsertProcessActionPrivilegeCommand from "./Commands/Process/upsertProcessActionPrivilegeCommand.js";
import UpsertProcessChainElementCommand from "./Commands/Process/upsertProcessChainElementCommand.js";
import UpsertProcessCommand from "./Commands/Process/upsertProcessCommand.js";
import UpsertProcessElementActionCommand from "./Commands/Process/upsertProcessElementActionCommand.js";
import UpsertProcessElementStateCommand from "./Commands/Process/upsertProcessElementStateCommand.js";
import ChoosePlanCommand from "./Commands/Projects/choosePlanCommand.js";
import InsertProjectCommand from "./Commands/Projects/insertProjectCommand.js";
import RunBuildCommand from "./Commands/Projects/runBuildCommand.js";
import SetProjectBuildProgressCommand from "./Commands/Projects/setProjectBuildProgressCommand.js";
import UpdateProjectCommand from "./Commands/Projects/updateProjectCommand.js";
import UploadBlobProjectCommand from "./Commands/Projects/uploadBlobProjectCommand.js";
import CreateRoleCommand from "./Commands/Roles/createRoleCommand.js";
import GrantRoleToProjectCommand from "./Commands/Roles/grantRoleToProjectCommand.js";
import RevokeRoleFromProjectCommand from "./Commands/Roles/revokeRoleFromProjectCommand.js";
import UpsertSeoCommand from "./Commands/Seo/upsertSeoCommand.js";
import LinkStatusActionCommand from "./Commands/Status/linkStatusActionCommand.js";
import RemoveStatusCommand from "./Commands/Status/removeStatusCommand.js";
import UnlinkStatusActionCommand from "./Commands/Status/unlinkStatusActionCommand.js";
import UpsertStatusCommand from "./Commands/Status/upsertStatusCommand.js";
import UpsertStatusGlobalCommand from "./Commands/Status/upsertStatusGlobalCommand.js";
import AuthorizeUserCommand from "./Commands/User/authorizeUserCommand.js";
import ChangePasswordCommand from "./Commands/User/changePasswordCommand.js";
import CreateUserByExternalCommand from "./Commands/User/createUserByExternalCommand.js";
import CreateUserCommand from "./Commands/User/createUserCommand.js";
import EditUserCommand from "./Commands/User/editUserCommand.js";
import ForgotPasswordCommand from "./Commands/User/forgotPasswordCommand.js";
import GenRefreshTokenCommand from "./Commands/User/genRefreshTokenCommand.js";
import GrantUserRoleCommand from "./Commands/User/grantUserRoleCommand.js";
import GrantUserTypeRoleCommand from "./Commands/User/grantUserTypeRoleCommand.js";
import LogOutCommand from "./Commands/User/logOutCommand.js";
import RemoveUserCommand from "./Commands/User/removeUserCommand.js";
import RemoveUserTypeCommand from "./Commands/User/removeUserTypeCommand.js";
import RevokeUserRoleCommand from "./Commands/User/revokeUserRoleCommand.js";
import RevokeUserTypeRoleCommand from "./Commands/User/revokeUserTypeRoleCommand.js";
import SendMailForgotPasswordCommand from "./Commands/User/sendMailForgotPasswordCommand.js";
import SetCoordinatesCommand from "./Commands/User/setCoordinatesCommand.js";
import SetLanguageCommand from "./Commands/User/setLanguageCommand.js";
import SetProfileImageCommand from "./Commands/User/setProfileImageCommand.js";
import UpsertUsersInvoiceDataCommand from "./Commands/User/upsertUsersInvoiceDataCommand.js";
import UpsertUserTypeCommand from "./Commands/User/upsertUserTypeCommand.js";
import SequelizeDB from "./Database/models/index.js";
import Item_CreateItemProcess from "./Processes/item_CreateItemProcess.js";
import Item_Cron_ReminderDaysProcess from "./Processes/item_cron_reminderDaysProcess.js";
import Item_ESSyncProcess from "./Processes/item_ESSyncProcess.js";
import Item_GoToStepProcess from "./Processes/item_GoToStepProcess.js";
import Item_SetExpiredProcess from "./Processes/item_SetExpiredProcess.js";
import Item_UpdateExpiredItemProcess from './Processes/item_UpdateExpiredItemProcess.js';
import Item_VerificationProcess from "./Processes/item_VerificationProcess.js";
import IUA_CreateChatProcess from "./Processes/iua_CreateChatProcess.js";
import IUA_GoToStepProcess from "./Processes/iua_GoToStepProcess.js";
import IUA_ItemSyncProcess from "./Processes/iua_ItemSyncProcess.js";
import IUA_NewProcess from "./Processes/iua_NewProcess.js";
import IUA_ReadyProcess from "./Processes/iua_ReadyProcess.js";
import IUA_ReservationAcceptProcess from "./Processes/iua_ReservationAcceptProcess.js";
import IUA_SetToItemCommentProcess from "./Processes/iua_SetToItemCommentProcess.js";
import IUA_StartProcess from "./Processes/iua_StartProcess.js";
import IUA_UnblockChatProcess from "./Processes/iua_UnblockChatProcess.js";
import IUA_WaitingForPayProcess from "./Processes/iua_WaitingForPayProcess.js";
import GetActionsQuery from "./Query/Actions/getActionsQuery.js";
import GetProjectActionsQuery from "./Query/Actions/getProjectActionsQuery.js";
import GetBlobsBase64ByGuidsQuery from "./Query/Blob/getBlobsBase64ByGuidsQuery.js";
import GetProjectsStorageQuery from "./Query/Blob/getProjectsStorageQuery.js";
import GetUnverifiedBlobsQuery from "./Query/Blob/getUnverifiedBlobsQuery.js";
import GetUserImagesQuery from "./Query/Blob/getUserImagesQuery.js";
import GetCategoriesAllQuery from "./Query/Category/getCategoriesAllQuery.js";
import GetCategoryActionsQuery from "./Query/Category/getCategoryActionsQuery.js";
import GetCategoryFreetextQuery from "./Query/Category/getCategoryFreetextQuery.js";
import GetCategoryQuery from "./Query/Category/getCategoryQuery.js";
import GetCategoryTreeQuery from "./Query/Category/getCategoryTreeQuery.js";
import GetAllCategoriesOptionQuery from "./Query/CategoryOptions/getAllCategoryOptionsQuery.js";
import GetCategoryLinkQuery from './Query/CategoryOptions/getCategoryLinkQuery.js';
import GetCategoryOptionsQuery from "./Query/CategoryOptions/getCategoryOptionsQuery.js";
import GetCategoryOptionsTypeQuery from "./Query/CategoryOptions/getCategoryOptionsTypeQuery.js";
import GeocodeQuery from "./Query/City/geocodeQuery.js";
import GetCitiesQuery from "./Query/City/getCitiesQuery.js";
import ReverseGeocodeQuery from "./Query/City/reverseGeocodeQuery.js";
import MjmlCompileQuery from "./Query/Common/mjmlCompileQuery.js";
import GetCountriesByIdQuery from "./Query/Country/getCountriesByIdQuery.js";
import GetCountriesQuery from "./Query/Country/getCountriesQuery.js";
import GetDictionariesQuery from "./Query/Dictionary/getDictionariesQuery.js";
import GetDimensionsQuery from "./Query/Dimensions/getDimensionsQuery.js";
import GetProjectDimensiosQuery from "./Query/Dimensions/getProjectDimensiosQuery.js";
import GetUserInvoicesQuery from "./Query/Invoice/getUserInvoicesQuery.js";
import GetItemByIdQuery from "./Query/Item/getItemByIdQuery.js";
import GetItemQuery from "./Query/Item/getItemQuery.js";
import GetItemTransactionQuery from "./Query/Item/getItemTransactionQuery.js";
import GetItemUserActionsHistoryQuery from "./Query/Item/getItemUserActionsHistoryQuery.js";
import GetItemUserActionsListQuery from "./Query/Item/getItemUserActionsListQuery.js";
import GetItemUserActionsQuery from "./Query/Item/getItemUserActionsQuery.js";
import GetUserItemQuery from "./Query/Item/getUserItemQuery.js";
import GetUserItemToSyncQuery from "./Query/Item/getUserItemToSyncQuery.js";
import SearchItemQuery from "./Query/Item/searchItemQuery.js";
import GetLanguagesQuery from "./Query/Language/getLanguagesQuery.js";
import GetProjectLanguagesQuery from "./Query/Language/getProjectLanguagesQuery.js";
import TranslateQuery from "./Query/Language/translateQuery.js";
import GetMailPartQuery from "./Query/Mails/getMailPartQuery.js";
import GetMailSendersQuery from "./Query/Mails/getMailSendersQuery.js";
import GetMailTypeProjectQuery from "./Query/Mails/getMailTypeProjectQuery.js";
import GetMailTypesQuery from "./Query/Mails/getMailTypesQuery.js";
import GetConversationInfoQuery from "./Query/Messages/getConversationInfoQuery.js";
import GetConversationQuery from "./Query/Messages/getConversationQuery.js";
import GetConversationsQuery from "./Query/Messages/getConversationsQuery.js";
import GetToReadMessagesQuery from "./Query/Messages/getToReadMessagesQuery.js";
import GetPrivilegesQuery from "./Query/Privileges/getPrivilegesQuery.js";
import GetProjectPrivilegesQuery from "./Query/Privileges/getProjectPrivilegesQuery.js";
import GetProcessQuery from "./Query/Process/getProcessQuery.js";
import GetProjectQuery from "./Query/Project/getProjectQuery.js";
import GetProjectSocketsQuery from "./Query/Project/getProjectsSocketsQuery.js";
import GetProjectUsersQuery from "./Query/Project/getProjectUsersQuery.js";
import GetUsersProjectsQuery from "./Query/Project/getUsersProjectsQuery.js";
import LoginBliskonasProjectQuery from "./Query/Project/LoginBliskoNasProjectQuery/loginBliskoNasProjectQuery.js";
import LoginJustshareProjectQuery from "./Query/Project/LoginJustshareProjectQuery/loginJustshareProjectQuery.js";
import LoginLogisticProjectQuery from "./Query/Project/LoginLogisticProjectQuery/loginLogisticProjectQuery.js";
import LoginProjectQuery from "./Query/Project/LoginProjectQuery/loginProjectQuery.js";
import GetProjectRolesQuery from "./Query/Roles/getProjectRolesQuery.js";
import GetRolesQuery from "./Query/Roles/getRolesQuery.js";
import GetSeoQuery from "./Query/Seo/getSeoQuery.js";
import GetStatusGlobalQuery from "./Query/Status/getStatusGlobalQuery.js";
import GetStatusQuery from "./Query/Status/getStatusQuery.js";
import GetRefreshTokenQuery from "./Query/User/getRefreshTokenQuery.js";
import GetUserInfoQuery from "./Query/User/getUserInfoQuery.js";
import GetUsersInvoiceDataQuery from "./Query/User/getUsersInvoiceDataQuery.js";
import GetUsersQuery from "./Query/User/getUsersQuery.js";
import GetUserTypesQuery from "./Query/User/getUserTypesQuery.js";
import LogInByExternalQuery from "./Query/User/logInByExternalQuery.js";
import LogInByRefreshTokenQuery from "./Query/User/logInByRefreshTokenQuery.js";
import UserLogInInternalQuery from "./Query/User/userLogInInternalQuery.js";
import ActionPrivilegesRepository from "./Repository/actionPrivilegesRepository.js";
import ActionProjectRepository from "./Repository/actionProjectRepository.js";
import ActionRepository from "./Repository/actionRepository.js";
import BlobMapperRepository from "./Repository/blobMapperRepository.js";
import BlobRepository from "./Repository/blobRepository.js";
import CategoryActionsRepository from "./Repository/categoryActionsRepository.js";
import CategoryHierarchyRepository from "./Repository/categoryHierarchyRepository.js";
import CategoryOptionsRepository from "./Repository/categoryOptionsRepository.js";
import CategoryRepository from "./Repository/categoryRepository.js";
import CityRepository from "./Repository/cityRepository.js";
import CommentRepository from "./Repository/commentRepository.js";
import ConfigRepository from "./Repository/configRepository.js";
import ConversationMessagesMembersRepository from "./Repository/conversationMessagesMembersRepository.js";
import ConversationMessagesRepository from "./Repository/conversationMessagesRepository.js";
import ConversationRepository from "./Repository/conversationRepository.js";
import CountryRepository from "./Repository/countryRepository.js";
import DimensionsProjectRepository from "./Repository/dimensionsProjectRepository.js";
import DimensionsRepository from "./Repository/dimensionsRepository.js";
import InvoiceItemRepository from "./Repository/invoiceItemsRepository.js";
import InvoiceRepository from "./Repository/invoiceRepository.js";
import InvoiceUserRepository from "./Repository/invoiceUserRepository.js";
import ItemCategoryOptionRepository from "./Repository/itemCategoryOptionRepository.js";
import ItemCategoryRepository from "./Repository/itemCategoryRepository.js";
import ItemRepository from "./Repository/itemRepository.js";
import ItemTransactionCategoryOptionsRepository from "./Repository/itemTransactionCategoryOptionsRepository.js";
import ItemTransactionsRepository from "./Repository/itemTransactionsRepository.js";
import ItemUserActionRepository from "./Repository/itemUserActionRepository.js";
import LanguageProjectRepository from "./Repository/languageProjectRepository.js";
import LanguageRepository from "./Repository/languageRepository.js";
import MailPartsRepository from "./Repository/mailPartsRepository.js";
import MailSendersRepository from "./Repository/mailSendersRepository.js";
import MailTypesProjectRepository from "./Repository/mailTypesProjectRepository.js";
import MailTypesRepository from "./Repository/mailTypesRepository.js";
import PrivilegeProjectRepository from "./Repository/privilegeProjectRepository.js";
import PrivilegeRepository from "./Repository/privilegeRepository.js";
import ProcessChainActionInjectionRepository from "./Repository/processChainActionInjectionRepository.js";
import ProcessChainPrivilegesRepository from "./Repository/processChainPrivilegesRepository.js";
import ProcessChainRepository from "./Repository/processChainRepository.js";
import ProcessChainStateRepository from "./Repository/processChainStateRepository.js";
import ProcessRepository from "./Repository/processRepository.js";
import ProjectRepository from "./Repository/projectRepository.js";
import RolesProjectRepository from "./Repository/rolesProjectRepository.js";
import RolesRepository from "./Repository/rolesRepository.js";
import SeoRepository from "./Repository/seoRepository.js";
import StatusActionsRepository from "./Repository/statusActionsRepository.js";
import StatusProjectsRepository from "./Repository/statusProjectsRepository.js";
import StatusRepository from "./Repository/statusRepository.js";
import TagRepository from "./Repository/tagRepository.js";
import TextRepository from './Repository/textRepository.js';
import TranslationRepository from "./Repository/translationRepository.js";
import UserAuthRepository from "./Repository/userAuthRepository.js";
import UserConversationsRepository from "./Repository/userConversationsRepository.js";
import UserInvoiceValuesRepository from "./Repository/userInvoiceValuesRepository.js";
import UserProjectPrivilegesRepository from "./Repository/userProjectPrivilegesRepository.js";
import UserRepository from "./Repository/userRepository.js";
import UserRolesRepository from "./Repository/userRolesRepository.js";
import UserTypesRepository from "./Repository/userTypesRepository.js";
import UserTypesRolesRepository from "./Repository/userTypesRolesRepository.js";
import ActionPrivilegesService from "./Services/actionPrivilegesService.js";
import ActionProjectService from "./Services/actionProjectService.js";
import ActionService from "./Services/actionService.js";
import BlobService from "./Services/blobService.js";
import CategoryOptionService from "./Services/categoryOptionService.js";
import CategoryService from "./Services/categoryService.js";
import CityService from "./Services/cityService.js";
import CommentService from "./Services/commentService.js";
import ConfigService from "./Services/configService.js";
import ConversationMessageMembersService from "./Services/conversationMessagesMemberService.js";
import ConversationMessagesService from "./Services/conversationMessagesService.js";
import ConversationService from "./Services/conversationService.js";
import CountryService from "./Services/countryService.js";
import DimensionsProjectService from "./Services/dimensionsProjectService.js";
import DimensionsService from "./Services/dimensionsService.js";
import ElasticSearchService from "./Services/elasticSearchService.js";
import InvoiceService from "./Services/invoiceService.js";
import ItemService from "./Services/itemService.js";
import ItemTransactionCategoryOptionsService from "./Services/itemTransactionCategoryOptionsService.js";
import ItemTransactionService from "./Services/itemTransactionsService.js";
import ItemUserActionService from "./Services/itemUserActionService.js";
import LanguageProjectService from "./Services/languageProjectService.js";
import LanguageService from "./Services/languageService.js";
import MailPartsService from "./Services/mailPartsService.js";
import MailSendersService from "./Services/mailSendersService.js";
import MailTypesProjectService from "./Services/mailTypesProjectService.js";
import MailTypesService from "./Services/mailTypesService.js";
import PrivilegeProjectService from "./Services/privilegeProjectService.js";
import PrivilegeService from "./Services/privilegeService.js";
import ProcessService from "./Services/processService.js";
import ProjectService from "./Services/projectService.js";
import RoleProjectService from "./Services/roleProjectService.js";
import RoleService from "./Services/roleService.js";
import SeoService from "./Services/seoService.js";
import StatusProjectService from "./Services/statusProjectService.js";
import TagService from "./Services/tagService.js";
import TranslationService from "./Services/translationService.js";
import UserConversationService from "./Services/userConversationService.js";
import UserRolesService from "./Services/userRoleService.js";
import UserService from "./Services/userService.js";
import UserTypesRolesService from "./Services/userTypesRolesService.js";
import UserTypesService from "./Services/userTypesService.js";
import UnitOfWork from "./unitOfWork.js";

/**
 * 
 */
const { asValue, asFunction, asClass } = awilix;

let exporter = {
  categoryRepositoryDI: asClass(CategoryRepository),
  categoryServiceDI: asClass(CategoryService),
  userRepositoryDI: asClass(UserRepository),
  userServiceDI: asClass(UserService),
  blobRepositoryDI: asClass(BlobRepository),
  blobServiceDI: asClass(BlobService),
  blobMapperRepositoryDI: asClass(BlobMapperRepository),
  categoryHierarchyRepositoryDI: asClass(CategoryHierarchyRepository),
  itemCategoryRepositoryDI: asClass(ItemCategoryRepository),
  itemRepositoryDI: asClass(ItemRepository),
  textRepositoryDI: asClass(TextRepository),
  itemServiceDI: asClass(ItemService),
  unitOfWorkDI: asClass(UnitOfWork, { lifetime: awilix.Lifetime.SCOPED }),
  countryRepositoryDI: asClass(CountryRepository),
  countryServiceDI: asClass(CountryService),
  cityRepositoryDI: asClass(CityRepository),
  cityServiceDI: asClass(CityService),
  categoryOptionsRepositoryDI: asClass(CategoryOptionsRepository),
  categoryOptionServiceDI: asClass(CategoryOptionService),
  itemCategoryOptionRepositoryDI: asClass(ItemCategoryOptionRepository),
  userAuthRepositoryDI: asClass(UserAuthRepository),
  elasticSearchServiceDI: asClass(ElasticSearchService),
  tagServiceDI: asClass(TagService),
  tagRepositoryDI: asClass(TagRepository),
  projectRepositoryDI: asClass(ProjectRepository),
  projectServiceDI: asClass(ProjectService),
  configRepositoryDI: asClass(ConfigRepository),
  configServiceDI: asClass(ConfigService),
  sequelizeDI: asValue(SequelizeDB),
  userProjectPrivilegesRepositoryDI: asClass(UserProjectPrivilegesRepository),
  privilegeRepositoryDI: asClass(PrivilegeRepository),
  actionPrivilegesRepositoryDI: asClass(ActionPrivilegesRepository),
  actionProjectRepositoryDI: asClass(ActionProjectRepository),
  actionRepositoryDI: asClass(ActionRepository),
  categoryActionsRepositoryDI: asClass(CategoryActionsRepository),
  privilegeProjectRepositoryDI: asClass(PrivilegeProjectRepository),
  rolesProjectRepositoryDI: asClass(RolesProjectRepository),
  userRolesRepositoryDI: asClass(UserRolesRepository),
  userTypesRepositoryDI: asClass(UserTypesRepository),
  userTypesRolesRepositoryDI: asClass(UserTypesRolesRepository),
  rolesRepositoryDI: asClass(RolesRepository),
  translationRepositoryDI: asClass(TranslationRepository),
  actionServiceDI: asClass(ActionService),
  actionPrivilegesServiceDI: asClass(ActionPrivilegesService),
  actionProjectServiceDI: asClass(ActionProjectService),
  privilegeProjectServiceDI: asClass(PrivilegeProjectService),
  privilegeServiceDI: asClass(PrivilegeService),
  languageProjectRepositoryDI: asClass(LanguageProjectRepository),
  languageRepositoryDI: asClass(LanguageRepository),
  languageServiceDI: asClass(LanguageService),
  languageProjectServiceDI: asClass(LanguageProjectService),
  translationServiceDI: asClass(TranslationService),
  roleServiceDI: asClass(RoleService),
  roleProjectServiceDI: asClass(RoleProjectService),
  userTypesServiceDI: asClass(UserTypesService),
  userTypesRolesServiceDI: asClass(UserTypesRolesService),
  userRolesServiceDI: asClass(UserRolesService),
  dimensionsProjectRepositoryDI: asClass(DimensionsProjectRepository),
  dimensionsRepositoryDI: asClass(DimensionsRepository),
  dimensionsProjectServiceDI: asClass(DimensionsProjectService),
  dimensionsServiceDI: asClass(DimensionsService),
  mailTypesServiceDI: asClass(MailTypesService),
  mailTypesRepositoryDI: asClass(MailTypesRepository),
  mailSendersServiceDI: asClass(MailSendersService),
  mailSendersRepositoryDI: asClass(MailSendersRepository),
  mailPartsRepositoryDI: asClass(MailPartsRepository),
  mailPartsServiceDI: asClass(MailPartsService),
  mailTypesProjectRepositoryDI: asClass(MailTypesProjectRepository),
  mailTypesProjectServiceDI: asClass(MailTypesProjectService),
  seoServiceDI: asClass(SeoService),
  seoRepositoryDI: asClass(SeoRepository),
  itemTransactionRepositoryDI: asClass(ItemTransactionsRepository),
  itemUserActionRepositoryDI: asClass(ItemUserActionRepository),
  itemTransactionCategoryOptionsRepositoryDI: asClass(ItemTransactionCategoryOptionsRepository),
  itemTransactionsServiceDI: asClass(ItemTransactionService),
  itemUserActionServiceDI: asClass(ItemUserActionService),
  itemTransactionCategoryOptionsServiceDI: asClass(ItemTransactionCategoryOptionsService),
  conversationMessagesRepositoryDI: asClass(ConversationMessagesRepository),
  conversationRepositoryDI: asClass(ConversationRepository),
  userConversationsRepositoryDI: asClass(UserConversationsRepository),
  userConversationServiceDI: asClass(UserConversationService),
  conversationMessagesServiceDI: asClass(ConversationMessagesService),
  conversationServiceDI: asClass(ConversationService),
  conversationMessagesMembersRepositoryDI: asClass(ConversationMessagesMembersRepository),
  conversationMessageMembersServiceDI: asClass(ConversationMessageMembersService),
  statusActionsRepositoryDI: asClass(StatusActionsRepository),
  statusProjectsRepositoryDI: asClass(StatusProjectsRepository),
  statusRepositoryDI: asClass(StatusRepository),
  statusProjectServiceDI: asClass(StatusProjectService),
  invoiceServiceDI: asClass(InvoiceService),
  invoiceRepositoryDI: asClass(InvoiceRepository),
  commentServiceDI: asClass(CommentService),
  commentRepositoryDI: asClass(CommentRepository),
  invoiceItemRepositoryDI: asClass(InvoiceItemRepository),
  invoiceUserRepositoryDI: asClass(InvoiceUserRepository),
  userInvoiceValuesRepositoryDI: asClass(UserInvoiceValuesRepository),
  processChainRepositoryDI: asClass(ProcessChainRepository),
  processRepositoryDI: asClass(ProcessRepository),
  processChainStateRepositoryDI: asClass(ProcessChainStateRepository),
  processServiceDI: asClass(ProcessService),
  processChainActionInjectionRepositoryDI: asClass(ProcessChainActionInjectionRepository),
  processChainPrivilegesRepositoryDI: asClass(ProcessChainPrivilegesRepository),


};
exporter[CommandList.Dictionary.ADD_DICTIONARY] = asClass(
  AddToDictionaryCommand
);
exporter[QueryList.Dictionary.GET_DICTIONARY] = asClass(GetDictionariesQuery);
exporter[CommandList.Dictionary.REMOVE_DICTIONARY] = asClass(
  RemoveDictionaryCommand
);
////////////////////////COMMON///////////////////////////////////////////
exporter[QueryList.Common.MJML_COMPILE] = asClass(MjmlCompileQuery);

////////////////////////SEO///////////////////////////////////////////

exporter[QueryList.Seo.GET_SEO] = asClass(GetSeoQuery);
exporter[CommandList.Seo.UPSERT_SEO] = asClass(UpsertSeoCommand);

//////////////////////MAILS/////////////////////////////////////////////
exporter[CommandList.Mail.DELETE_MAIL_SENDER] = asClass(RemoveMailSenderCommand);
exporter[CommandList.Mail.DELETE_MAIL_TYPE] = asClass(RemoveMailTypeCommand);
exporter[CommandList.Mail.DELETE_MAIL_TYPE_PROJECT] = asClass(RemoveMailTypeProjectCommand);
exporter[CommandList.Mail.DELETE_MAIL_PART] = asClass(RemoveMailPartCommand);
exporter[CommandList.Mail.UPSERT_MAIL_SENDER] = asClass(UpsertMailSenderCommand);
exporter[CommandList.Mail.UPSERTE_MAIL_TYPE] = asClass(UpsertMailTypeCommand);
exporter[CommandList.Mail.UPSERT_MAIL_TYPE_PROJECT] = asClass(UpsertMailTypeProjectCommand);
exporter[CommandList.Mail.UPSERT_MAIL_PART] = asClass(UpsertMailPartCommand);


exporter[QueryList.Mail.GET_MAIL_TYPE_PROJECT] = asClass(GetMailTypeProjectQuery);
exporter[QueryList.Mail.GET_MAIL_SENDER] = asClass(GetMailSendersQuery);
exporter[QueryList.Mail.GET_MAIL_TYPE] = asClass(GetMailTypesQuery);
exporter[QueryList.Mail.GET_MAIL_PART] = asClass(GetMailPartQuery);




///////////////////////DIMENSIONS////////////////////////////////////////
exporter[CommandList.Dimensions.DELETE_DIM_GLOBALLY] = asClass(DeleteDimensionCommand);
exporter[CommandList.Dimensions.DELETE_DIM] = asClass(DeleteDimensionProjectCommand);
exporter[CommandList.Dimensions.UPSERT_DIM] = asClass(UpsertDimensionProjectCommand);
exporter[CommandList.Dimensions.UPSERT_DIM_GLOBALLY] = asClass(UpsertDimensionCommand);

exporter[QueryList.Dimensions.GET_GLOBAL_DIM] = asClass(GetDimensionsQuery);
exporter[QueryList.Dimensions.GET_DIM] = asClass(GetProjectDimensiosQuery);

///////////////////////LANGUAGES////////////////////////////////////////
exporter[CommandList.Languages.DELETE_LANGUAGE] = asClass(DeleteLanguageFromProjectCommand);
exporter[CommandList.Languages.INSERT_LANGUAGE] = asClass(InsertLanguageToProjectCommand);
exporter[CommandList.Languages.INSERT_LANGUAGE_GLOBAL] = asClass(InsertLanguageCommand);
exporter[CommandList.Languages.UPSERT_TRANSLATION] = asClass(UpsertTranslateCommand);
exporter[CommandList.Languages.SET_AS_MAIN_LANG] = asClass(SetAsMainLanguageCommand);

exporter[QueryList.Languages.GET_GLOBAL_LANGUAGES] = asClass(GetLanguagesQuery);
exporter[QueryList.Languages.GET_LANGUAGES] = asClass(GetProjectLanguagesQuery);
exporter[QueryList.Languages.TRANSLATE] = asClass(TranslateQuery);

///////////////////////ACTIONS////////////////////////////////////////
exporter[CommandList.Actions.DELETE_GLOBAL_ACTIONS] = asClass(DeleteActionCommand);
exporter[CommandList.Actions.DELETE_ACTIONS] = asClass(DeleteActionsProjectCommand);
exporter[CommandList.Actions.DELETE_ACTIONS_PRIVS] = asClass(DeleteActionPrivilegesCommand);
exporter[CommandList.Actions.UPSERT_GLOBAL_ACTIONS] = asClass(UpsertActionCommand);
exporter[CommandList.Actions.UPSERT_ACTIONS] = asClass(UpsertActionsProjectCommand);
exporter[CommandList.Actions.UPSERT_ACTIONS_PRIVS] = asClass(UpsertActionPrivilegesCommand);


exporter[QueryList.Actions.GET_GLOBAL_ACTIONS] = asClass(GetActionsQuery);
exporter[QueryList.Actions.GET_ACTIONS] = asClass(GetProjectActionsQuery);

///////////////////////PRIVILEGES////////////////////////////////////////
exporter[CommandList.Privileges.DELETE_PRIV_GLOBALLY] = asClass(DeletePrivilegesCommand);
exporter[CommandList.Privileges.DELETE_PRIV] = asClass(DeletePrivilegesProjectCommand);
exporter[CommandList.Privileges.UPSERT_PRIV_GLOBALLY] = asClass(UpsertPrivilegesCommand);
exporter[CommandList.Privileges.UPSERT_PRIV] = asClass(UpsertPrivilegesProjectCommand);


exporter[QueryList.Privileges.GET_PRIVS] = asClass(GetProjectPrivilegesQuery);
exporter[QueryList.Privileges.GET_GLOBAL_PRIVS] = asClass(GetPrivilegesQuery);


///////////////////////ROLES////////////////////////////////////////
exporter[CommandList.Roles.CREATE_ROLE_GLOBAL] = asClass(CreateRoleCommand);
exporter[CommandList.Roles.GRANT_ROLE_TO_PROJECT] = asClass(GrantRoleToProjectCommand);
exporter[CommandList.Roles.REVOKE_ROLE_TO_PROJECT] = asClass(RevokeRoleFromProjectCommand);


exporter[QueryList.Roles.GET_ROLES] = asClass(GetProjectRolesQuery);
exporter[QueryList.Roles.GET_GLOBAL_ROLES] = asClass(GetRolesQuery);


///////////////////////USER////////////////////////////////////////
exporter[CommandList.User.CREATE_USER] = asClass(CreateUserCommand);
exporter[CommandList.User.LOG_OUT] = asClass(LogOutCommand);
exporter[CommandList.User.GEN_REFRESH_TOKEN] = asClass(GenRefreshTokenCommand);
exporter[CommandList.User.AUTHORIZE_USER] = asClass(AuthorizeUserCommand);
exporter[CommandList.User.CHANGE_PASSWORD] = asClass(ChangePasswordCommand);
exporter[CommandList.User.FORGOT_PASSWORD] = asClass(ForgotPasswordCommand);
exporter[CommandList.User.REMOVE_USER] = asClass(RemoveUserCommand);
exporter[CommandList.User.FORGOT_PASSWORD_CHECK] = asClass(
  SendMailForgotPasswordCommand
);
exporter[CommandList.User.SET_LANGUAGE] = asClass(SetLanguageCommand);
exporter[CommandList.User.SET_COORDIATES] = asClass(SetCoordinatesCommand);
exporter[CommandList.User.SET_PROFILE_IMAGE] = asClass(SetProfileImageCommand)
exporter[CommandList.User.CREATE_USER_EXTERNAL_PROV] = asClass(CreateUserByExternalCommand)
exporter[CommandList.User.GRANT_USER_ROLE] = asClass(GrantUserRoleCommand)
exporter[CommandList.User.GRANT_USERTYPE_ROLE] = asClass(GrantUserTypeRoleCommand)
exporter[CommandList.User.REMOVE_USERTYPE] = asClass(RemoveUserTypeCommand)
exporter[CommandList.User.REVOKE_USER_ROLE] = asClass(RevokeUserRoleCommand)
exporter[CommandList.User.REVOKE_USERTYPE_ROLE] = asClass(RevokeUserTypeRoleCommand)
exporter[CommandList.User.EDIT_USER] = asClass(EditUserCommand)
exporter[CommandList.User.UPSERT_USERS_INVOICE_DATA] = asClass(UpsertUsersInvoiceDataCommand)


exporter[CommandList.User.UPSERT_USERTYPE] = asClass(UpsertUserTypeCommand)


exporter[QueryList.User.USER_INFO] = asClass(GetUserInfoQuery)
exporter[QueryList.User.LOG_IN_INTERNAL] = asClass(UserLogInInternalQuery);
exporter[QueryList.User.LOG_IN_BY_REFRESH_TOKEN] = asClass(
  LogInByRefreshTokenQuery
);
exporter[QueryList.User.LOGIN_BY_EXTERNAL] = asClass(LogInByExternalQuery)
exporter[QueryList.User.GET_REFRESH_TOKEN] = asClass(GetRefreshTokenQuery);
exporter[QueryList.User.GET_USER_TYPES] = asClass(GetUserTypesQuery);
exporter[QueryList.User.GET_ALL_USERS] = asClass(GetUsersQuery);
exporter[QueryList.User.GET_USER_INVOICE_DATA] = asClass(GetUsersInvoiceDataQuery);


////////////////////////////////Category/////////////////////////////////////////
exporter[CommandList.Category.ADD_CATEGORY] = asClass(InsertCategoryCommand);
exporter[CommandList.Category.SET_AS_VERIFIED] = asClass(SetAsVerifiedCommand);
exporter[CommandList.Category.DELETE_CATEGORY] = asClass(DeleteCategoryCommand)
exporter[CommandList.Category.SET_PARENT] = asClass(SetParentCategoryCommand)
exporter[CommandList.Category.EDIT_CATEGORY] = asClass(EditCategoryCommand);
exporter[QueryList.Category.GET_CATEGORIES] = asClass(GetCategoryQuery);
exporter[QueryList.Category.GET_CATEGORIES_HIERARCHY] = asClass(
  GetCategoryTreeQuery
);
exporter[QueryList.Category.GET_CATEGORY_ACTIONS] = asClass(
  GetCategoryActionsQuery
);
exporter[CommandList.Category.INSERT_CATEGORY_ACTION] = asClass(InsertCategoryActionCommand);
exporter[CommandList.Category.REMOVE_CATEGORY_ACTION] = asClass(RemoveCategoryActionCommand);




exporter[QueryList.Category.GET_CATEGORIES_ALL_TREE] = asClass(GetCategoriesAllQuery)

exporter[QueryList.Category.GET_CATEGORIES_FREETEXT] = asClass(GetCategoryFreetextQuery)

///////////////////////////////////////////////////////////////////////////
////////////////////////////////CategoryOptions/////////////////////////////////////////

exporter[QueryList.CategoryOptions.GET_OPTIONS_TYPE] = asClass(GetCategoryOptionsTypeQuery);
exporter[QueryList.CategoryOptions.GET_CATEGORY_OPTION] = asClass(GetCategoryOptionsQuery)
exporter[QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS] = asClass(GetAllCategoriesOptionQuery);
exporter[QueryList.CategoryOptions.GET_CATEGORY_LINK_BY_ID] = asClass(GetCategoryLinkQuery);


exporter[CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS] = asClass(UpsertCategoryOptionsCommand);
exporter[CommandList.Category_Options.DELETE_CATEGORY_OPTIONS] = asClass(DeleteCategoryOptionsCommand);
exporter[CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS_TEMPLATE] = asClass(UpsertCategoryOptionsTemplateCommand);
exporter[CommandList.Category_Options.DELETE_CAETEGORY_OPTIONS_FOR_CATEGORY] = asClass(DeleteCategoryOptionsForCategoryCommand);
exporter[CommandList.Category_Options.UPSERT_CAETEGORY_OPTIONS_FOR_CATEGORY] = asClass(UpsertCategoryOptionsForCategoryCommand);
exporter[CommandList.Category_Options.DELETE_CATEGORY_OPTIONS_TEMPLATE] = asClass(DeleteCategoryOptionsTemplateCommand);



///////////////////////////////BLOB//////////////////////////////
exporter[CommandList.Blob.UPLOAD_IMAGE] = asClass(UploadImageCommand);
exporter[CommandList.Blob.REMOVE_BLOB] = asClass(RemoveBlobCommand);
exporter[CommandList.Blob.VERIFY_IMAGE] = asClass(VerifyImageCommand);
exporter[CommandList.Blob.UPLOAD_BLOB_TO_PROJECT] = asClass(UploadBlobToProjectsStorageCommand);


exporter[QueryList.Blob.GET_BLOBS_BY_GUIDS] = asClass(
  GetBlobsBase64ByGuidsQuery
);
exporter[QueryList.Blob.GET_USER_IMAGES] = asClass(GetUserImagesQuery);
exporter[QueryList.Blob.GET_UNVERIFIED] = asClass(GetUnverifiedBlobsQuery);
exporter[QueryList.Blob.GET_PROJECT_STORAGE] = asClass(GetProjectsStorageQuery);



///////////////////////ITEM//////////////////////////////////////
exporter[CommandList.Item.NEW_ITEM] = asClass(CreateItemCommand);
exporter[CommandList.Item.EDIT_ITEM] = asClass(EditItemCommand);
exporter[CommandList.Item.SYNC_ITEM] = asClass(SyncItemCommand);
exporter[CommandList.Item.SET_SYNC] = asClass(SetItemSyncCommand);
exporter[CommandList.Item.REMOVE_ITEM] = asClass(RemoveItemCommand);
exporter[CommandList.Item.RESERVATION_ITEM] = asClass(ReservationItemCommand);


exporter[QueryList.Item.GET_ITEM] = asClass(GetItemQuery);
exporter[QueryList.Item.SEARCH_ITEM] = asClass(SearchItemQuery);
exporter[QueryList.Item.GET_ITEM_BY_ID] = asClass(GetItemByIdQuery);
exporter[QueryList.Item.GET_USER_ITEMS] = asClass(GetUserItemQuery);
exporter[QueryList.Item.GET_USER_ITEMS_TO_SYNC] = asClass(GetUserItemToSyncQuery);
exporter[QueryList.Item.GET_USER_TRANSACTIONS] = asClass(GetItemTransactionQuery);


exporter[QueryList.Item.GET_ITEM_USER_ACTIONS] = asClass(GetItemUserActionsQuery)
exporter[QueryList.Item.GET_ITEM_USER_ACTIONS_LIST] = asClass(GetItemUserActionsListQuery)
exporter[QueryList.Item.GET_ITEM_USER_ACTIONS_HISTORY] = asClass(GetItemUserActionsHistoryQuery)


//ACTIONS
//RESERVATIONS


exporter[CommandList.Item.Actions.Reservation.ACCEPT] = asClass(ItemActionsReservationAcceptCommand);
exporter[CommandList.Item.Actions.Reservation.CANCELLED] = asClass(ItemActionsReservationCancelCommand);
exporter[CommandList.Item.Actions.Reservation.PAID] = asClass(ItemActionsReservationPaidCommand);
exporter[CommandList.Item.Actions.Reservation.REJECT] = asClass(ItemActionsReservationRejectCommand);
exporter[CommandList.Item.Actions.Reservation.COMPLETE] = asClass(ItemActionsReservationCompleteCommand);

exporter[CommandList.Item.Actions.Reservation.WAITING_FOR_RATE_CUSTOMER] = asClass(ItemActionsReservationWaitingForCustomerCommand);
exporter[CommandList.Item.Actions.Reservation.WAITING_FOR_RATE_CLIENT] = asClass(ItemActionsReservationWaitingForClientCommand);


///////////////////INVOICE////////////////////////////////
exporter[QueryList.Invoice.GET_USER_INVOICES] = asClass(GetUserInvoicesQuery);

///////////////////COUNTRY////////////////////////////////

exporter[QueryList.Country.GET_COUNTRY] = asClass(GetCountriesQuery);
exporter[QueryList.Country.GET_COUNTRY_BY_ID] = asClass(GetCountriesByIdQuery);


exporter[QueryList.City.GET_CITY] = asClass(GetCitiesQuery);
exporter[QueryList.City.REVERSE_GEO] = asClass(ReverseGeocodeQuery)
exporter[QueryList.City.REVERSE_LATLNG_GEO] = asClass(GeocodeQuery)









///////////////////////////////////////////////////////////

///////////////////PROJECT////////////////////////////////
exporter[CommandList.Project.CHOOSE_PLAN] = asClass(ChoosePlanCommand);
exporter[CommandList.Project.INSERT_PROJECT] = asClass(InsertProjectCommand);
exporter[CommandList.Project.RUN_BUILD] = asClass(RunBuildCommand);
exporter[CommandList.Project.SET_PROGRESS] = asClass(SetProjectBuildProgressCommand);
exporter[CommandList.Project.UPDATE_PROJECT] = asClass(UpdateProjectCommand);
exporter[CommandList.Project.UPLOAD_BLOB] = asClass(UploadBlobProjectCommand);

exporter[QueryList.Project.LOGIN] = asClass(LoginProjectQuery);
exporter[QueryList.Project.LOGIN_JS] = asClass(LoginJustshareProjectQuery)
exporter[QueryList.Project.LOGIN_LOGISTIC] = asClass(LoginLogisticProjectQuery)
exporter[QueryList.Project.LOGIN_BLISKO_NAS] = asClass(LoginBliskonasProjectQuery)
exporter[QueryList.Project.GET_PROJECT_INFO] = asClass(GetProjectQuery)
exporter[QueryList.Project.GET_USERS_PROJECTS] = asClass(GetUsersProjectsQuery)
exporter[QueryList.Project.GET_PROJECT_USERS] = asClass(GetProjectUsersQuery)
exporter[QueryList.Project.GET_PROJECT_SOCKETS] = asClass(GetProjectSocketsQuery)


///////////////////////////////////////////////////////////
///////////////////MESSAGS////////////////////////////////
exporter[CommandList.Messages.CLOSE_CONVERSATION] = asClass(ChoosePlanCommand);
exporter[CommandList.Messages.CREATE_CONVERSATION] = asClass(InsertProjectCommand);
exporter[CommandList.Messages.SEND_MESSAGE] = asClass(SendMessageCommand);
exporter[CommandList.Messages.READ_MSG] = asClass(ReadMessageCommand);


exporter[QueryList.Messages.GET_CONV_MESSAGES] = asClass(GetConversationQuery);
exporter[QueryList.Messages.GET_CONVERSATION] = asClass(GetConversationsQuery)
exporter[QueryList.Messages.GET_UNREAD_MSG] = asClass(GetToReadMessagesQuery)
exporter['getConversationInfoQuery'] = asClass(GetConversationInfoQuery)


///////////////////////////////////////////////////////////

///////////////////CONFIG////////////////////////////////



exporter[CommandList.Config.UPSERT_CONFIG] = asClass(UpsertConfigCommand);





/////////////////STATUS/////////////////////////


exporter[CommandList.Status.UPSERT_STATUS] = asClass(UpsertStatusCommand);
exporter[CommandList.Status.UPSERT_STATUS_GLOBAL] = asClass(UpsertStatusGlobalCommand);

exporter[CommandList.Status.UNLINK_STATUS_ACTION] = asClass(UnlinkStatusActionCommand);
exporter[CommandList.Status.LINK_STATUS_ACTION] = asClass(LinkStatusActionCommand);
exporter[CommandList.Status.REMOVE_STATUS] = asClass(RemoveStatusCommand);

exporter[QueryList.Status.GET_GLOBAL_STATUSES] = asClass(GetStatusGlobalQuery);
exporter[QueryList.Status.GET_STATUS] = asClass(GetStatusQuery);



///////////////////PROCESS//////////////////////////////
exporter[CommandList.Process.UPSERT_PROCESS] = asClass(UpsertProcessCommand);
exporter[CommandList.Process.UPSERT_CHAIN_ELEMENT] = asClass(UpsertProcessChainElementCommand);
exporter[CommandList.Process.UPSERT_CHAIN_STATE] = asClass(UpsertProcessElementStateCommand);
exporter[CommandList.Process.INVOKE_PROCESS] = asClass(InvokeProcessCommand);
exporter[CommandList.Process.DELETE_CHAIN_ELEMENT] = asClass(DeleteProcessChainElementCommand);
exporter[CommandList.Process.DELETE_CHAIN_STATE] = asClass(DeleteProcessElementStateCommand);
exporter[CommandList.Process.DELETE_PROCESS] = asClass(DeleteProcessCommand);
exporter[CommandList.Process.RUN_CRON_QUEUE] = asClass(RunCronQueueCommand);
exporter[CommandList.Process.UPSERT_CHAIN_ACTION] = asClass(UpsertProcessElementActionCommand);
exporter[CommandList.Process.UPSERT_CHAIN_PRIVILEGE] = asClass(UpsertProcessActionPrivilegeCommand);
exporter[CommandList.Process.DELETE_CHAIN_PRIVILEGE] = asClass(DeleteProcessActionPrivilegeCommand);
exporter[CommandList.Process.DELETE_CHAIN_ACTION] = asClass(DeleteProcessElementActionCommand);


exporter[QueryList.Process.GET_PROCESS] = asClass(GetProcessQuery);


///////////////////////////////////////////////////////////



//////////////////PROCESSES_TYPE////////////
exporter[ProcessList.Item.IUA_NEW] = asClass(IUA_NewProcess);
exporter[ProcessList.Item.IUA_RESERVATION_ACCEPT] = asClass(IUA_ReservationAcceptProcess);
//exporter[ProcessList.Item.IUA_WAITING_FOR_PAY] = asClass(IUA_WaitingForPayProcess);

exporter[ProcessList.Item.IUA_READY] = asClass(IUA_ReadyProcess);
exporter[ProcessList.Item.IUA_START] = asClass(IUA_StartProcess);
exporter[ProcessList.Item.IUA_ITEM_SYNC] = asClass(IUA_ItemSyncProcess);
exporter[ProcessList.Item.IUA_UNBLOCK_CHAT] = asClass(IUA_UnblockChatProcess);
exporter[ProcessList.Item.IUA_SET_TO_ITEM_COMMENT] = asClass(IUA_SetToItemCommentProcess);

exporter[ProcessList.Item.ITEM_CREATE_ITEM] = asClass(Item_CreateItemProcess);
exporter['item_ESSyncProcess'] = asClass(Item_ESSyncProcess);
exporter['item_GoToStepProcess'] = asClass(Item_GoToStepProcess);
exporter['item_VerificationProcess'] = asClass(Item_VerificationProcess)
exporter['item_UpdateExpiredItemProcess'] = asClass(Item_UpdateExpiredItemProcess)
exporter['item_cron_reminderDaysProcess'] = asClass(Item_Cron_ReminderDaysProcess)
exporter['item_SetExpiredProcess'] = asClass(Item_SetExpiredProcess)
exporter['iua_CreateChatProcess'] = asClass(IUA_CreateChatProcess)
exporter['iua_GoToStepProcess'] = asClass(IUA_GoToStepProcess)
exporter['iua_WaitingForPayProcess'] = asClass(IUA_WaitingForPayProcess)




/*
IUA_RESERVATION_ACCEPT: 'iua_ReservationAcceptProcess',
IUA_RESERVATION_WAITING_FOR_PAY: 'iua_WaitingForPayProcess',
IUA_RESERVATION_REJECT: 'iua_RejectReservationProcess',
IUA_RESERVATION_NEW: 'iua_NewReservationProcess',
IUA_PAID: 'iua_PaidProcess',
IUA_READY: 'iua_ReadyProcess',
IUA_START: 'iua_StartProcess',
IUA_END: 'iua_EndProcess',
IUA_WAITING_CLIENT_COMMENT: 'iua_WaitingForCommentClientProcess',
IUA_WAITING_OWNER_COMMENT: 'iua_WaitingForCommentOwnerProcess',
IUA_CLOSE: 'iua_CloseProcess',*/




ContainerAwlix.register(exporter);
let container = ContainerAwlix;
export default container;
