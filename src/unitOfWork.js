"use strict";

import { BaseUnitOfWork } from "./Architecture/Base/baseUnitOfWork.js";
import ActionPrivilegesRepository from "./Repository/actions/implementations/actionPrivilegesRepository.js";
import ActionProjectRepository from "./Repository/actions/implementations/actionProjectRepository.js";
import ActionRepository from "./Repository/actions/implementations/actionRepository.js";
import BlobMapperRepository from "./Repository/blob/implementations/blobMapperRepository.js";
import BlobRepository from "./Repository/blob/implementations/blobRepository.js";
import CategoryActionsRepository from "./Repository/category/implementations/categoryActionsRepository.js";
import CategoryHierarchyRepository from "./Repository/category/implementations/categoryHierarchyRepository.js";
import CategoryOptionsRepository from "./Repository/category/implementations/categoryOptionsRepository.js";
import CategoryRepository from "./Repository/category/implementations/categoryRepository.js";
import CityRepository from "./Repository/location/cityRepository.js";
//import CmsElementsProjectRepository from "./Repository/cms/cmsElementsProjectRepository.js";
//import CmsMenuItemsPrivilegesProjectRepository from "./Repository/cms/cmsMenuItemsPrivilegesProjectRepository.js";
//import CmsMenuItemsProjectsRepository from "./Repository/cms/cmsMenuItemsProjectRepository.js";
//import CmsMenuProjectsRepository from "./Repository/cms/cmsMenuProjectRepository.js";
//import CmsPagePrivilegesProjectRepository from "./Repository/cms/cmsPagePrivilegesProjectRepository.js";
//import CmsPageProjectsRepository from "./Repository/cms/cmsPageProjectsRepository.js";
//import CommentRepository from "./Repository/comments/commentRepository.js";
//import ConfigRepository from "./Repository/config/configRepository.js";
import ConversationMessagesMembersRepository from "./Repository/conversation/conversationMessagesMembersRepository.js";
import ConversationMessagesRepository from "./Repository/conversation/conversationMessagesRepository.js";
import ConversationRepository from "./Repository/conversation/conversationRepository.js";
import DimensionsProjectRepository from "./Repository/dimensions/dimensionsProjectRepository.js";
import DimensionsRepository from "./Repository/dimensions/dimensionsRepository.js";
import InvoiceItemRepository from "./Repository/invoice/invoiceItemsRepository.js";
import InvoiceRepository from "./Repository/invoice/invoiceRepository.js";
import InvoiceUserRepository from "./Repository/invoice/invoiceUserRepository.js";
import ItemCategoryOptionRepository from "./Repository/item/itemCategoryOptionRepository.js";
import ItemCategoryRepository from "./Repository/item/itemCategoryRepository.js";
import ItemRepository from "./Repository/item/itemRepository.js";
import ItemTransactionCategoryOptionsRepository from "./Repository/item/itemTransactionCategoryOptionsRepository.js";
import ItemTransactionsRepository from "./Repository/item/itemTransactionsRepository.js";
import ItemUserActionRepository from "./Repository/item/itemUserActionRepository.js";
import LanguageProjectRepository from "./Repository/language/languageProjectRepository.js";
import LanguageRepository from "./Repository/language/languageRepository.js";
import CountryRepository from "./Repository/location/countryRepository.js";
import MailPartsRepository from "./Repository/mail/mailPartsRepository.js";
import MailSendersRepository from "./Repository/mail/mailSendersRepository.js";
import MailTypesProjectRepository from "./Repository/mail/mailTypesProjectRepository.js";
import MailTypesRepository from "./Repository/mail/mailTypesRepository.js";
import PrivilegeProjectRepository from "./Repository/privileges/privilegeProjectRepository.js";
import PrivilegeRepository from "./Repository/privileges/privilegeRepository.js";
import ProcessChainActionInjectionRepository from "./Repository/process/processChainActionInjectionRepository.js";
import ProcessChainPrivilegesRepository from "./Repository/process/processChainPrivilegesRepository.js";
import ProcessChainRepository from "./Repository/process/processChainRepository.js";
import ProcessChainStateRepository from "./Repository/process/processChainStateRepository.js";
import ProcessRepository from "./Repository/process/processRepository.js";
import ProjectRepository from "./Repository/project/projectRepository.js";
import RolesProjectRepository from "./Repository/roles/rolesProjectRepository.js";
import RolesRepository from "./Repository/roles/rolesRepository.js";
import SeoRepository from "./Repository/seoRepository.js";
import StatusActionsRepository from "./Repository/status/statusActionsRepository.js";
import StatusProjectsRepository from "./Repository/status/statusProjectsRepository.js";
import StatusRepository from "./Repository/status/statusRepository.js";
import TagRepository from "./Repository/tag/tagRepository.js";
import TextRepository from "./Repository/textRepository.js";
import TranslationRepository from "./Repository/translations/translationRepository.js";
import UserAuthRepository from "./Repository/user/userAuthRepository.js";
import UserConversationsRepository from "./Repository/user/userConversationsRepository.js";
import UserInvoiceValuesRepository from "./Repository/user/userInvoiceValuesRepository.js";
import UserProjectPrivilegesRepository from "./Repository/user/userProjectPrivilegesRepository.js";
import UserRepository from "./Repository/user/userRepository.js";
import UserRolesRepository from "./Repository/user/userRolesRepository.js";
import UserTypesRepository from "./Repository/user/userTypesRepository.js";
import UserTypesRolesRepository from "./Repository/user/userTypesRolesRepository.js";







/**
 *
 *
 * @class UnitOfWork
 * @extends {BaseUnitOfWork}
 */
export default class UnitOfWork extends BaseUnitOfWork {

    /**
     * Creates an instance of UnitOfWork.
     * @param  { { categoryRepositoryDI:CategoryRepository,privilegeRepositoryDI:PrivilegeRepository,userProjectPrivilegesRepositoryDI:UserProjectPrivilegesRepository,configRepositoryDI:ConfigRepository, projectRepositoryDI:ProjectRepository,categoryOptionsRepositoryDI:CategoryOptionsRepository,userAuthRepositoryDI: UserAuthRepository,userRepositoryDI : UserRepository,categoryHierarchyRepositoryDI:CategoryHierarchyRepository,blobRepositoryDI:BlobRepository,blobMapperRepositoryDI:BlobMapperRepository,itemRepositoryDI:ItemRepository,itemCategoryRepositoryDI:ItemCategoryRepository, countryRepositoryDI:CountryRepository,cityRepositoryDI:CityRepository, itemCategoryOptionRepositoryDI:ItemCategoryOptionRepository,tagRepositoryDI:TagRepository}} 
     * @memberof UnitOfWork
     */
    // @ts-ignore
    constructor({ categoryRepositoryDI,
        projectRepositoryDI,
        configRepositoryDI,
        userRepositoryDI,
        categoryOptionsRepositoryDI,
        categoryHierarchyRepositoryDI,
        blobRepositoryDI,
        blobMapperRepositoryDI,
        itemCategoryRepositoryDI,
        itemRepositoryDI,
        textRepositoryDI,
        countryRepositoryDI,
        cityRepositoryDI,
        userAuthRepositoryDI,
        itemCategoryOptionRepositoryDI,
        tagRepositoryDI,
        privilegeRepositoryDI,
        actionPrivilegesRepositoryDI,
        actionProjectRepositoryDI,
        actionRepositoryDI,
        categoryActionsRepositoryDI,
        privilegeProjectRepositoryDI,
        rolesProjectRepositoryDI,
        userRolesRepositoryDI,
        userTypesRepositoryDI,
        userTypesRolesRepositoryDI,
        rolesRepositoryDI,
        translationRepositoryDI,
        languageRepositoryDI,
        languageProjectRepositoryDI,
        dimensionsProjectRepositoryDI,
        dimensionsRepositoryDI,
        mailTypesRepositoryDI,
        mailPartsRepositoryDI,
        mailTypesProjectRepositoryDI,
        mailSendersRepositoryDI,
        seoRepositoryDI,
        itemTransactionCategoryOptionsRepositoryDI,
        itemUserActionRepositoryDI,
        itemTransactionRepositoryDI,
        conversationMessagesRepositoryDI,
        conversationRepositoryDI,
        userConversationsRepositoryDI,
        conversationMessagesMembersRepositoryDI,
        statusActionsRepositoryDI,
        statusProjectsRepositoryDI,
        statusRepositoryDI,
        invoiceRepositoryDI,
        commentRepositoryDI,
        invoiceItemRepositoryDI,
        invoiceUserRepositoryDI,
        userInvoiceValuesRepositoryDI,
        processChainRepositoryDI,
        processRepositoryDI,
        processChainStateRepositoryDI,
        processChainPrivilegesRepositoryDI,
        processChainActionInjectionRepositoryDI,
        cmsElementsProjectRepositoryDI,
        cmsMenuItemsProjectRepositoryDI,
        cmsMenuProjectsRepositoryDI,
        cmsMenuItemsPrivilegesProjectRepositoryDI,
        cmsPageProjectsRepositoryDI,
        cmsPagePrivilegesProjectRepositoryDI
    }) {
        super()

        this.transaction = null;
        this.repositories = {
            textRepositoryDI,
            userRepositoryDI,
            categoryRepositoryDI,
            categoryHierarchyRepositoryDI,
            blobRepositoryDI,
            blobMapperRepositoryDI,
            itemCategoryRepositoryDI,
            itemRepositoryDI,
            countryRepositoryDI,
            cityRepositoryDI,
            userAuthRepositoryDI,
            categoryOptionsRepositoryDI,
            itemCategoryOptionRepositoryDI,
            tagRepositoryDI,
            projectRepositoryDI,
            configRepositoryDI,
            privilegeRepositoryDI,
            actionPrivilegesRepositoryDI,
            actionProjectRepositoryDI,
            actionRepositoryDI,
            categoryActionsRepositoryDI,
            privilegeProjectRepositoryDI,
            rolesProjectRepositoryDI,
            userRolesRepositoryDI,
            userTypesRepositoryDI,
            userTypesRolesRepositoryDI,
            rolesRepositoryDI,
            translationRepositoryDI,
            languageRepositoryDI,
            languageProjectRepositoryDI,
            dimensionsRepositoryDI,
            dimensionsProjectRepositoryDI,
            mailTypesRepositoryDI,
            mailPartsRepositoryDI,
            mailTypesProjectRepositoryDI,
            mailSendersRepositoryDI,
            seoRepositoryDI,
            itemTransactionCategoryOptionsRepositoryDI,
            itemUserActionRepositoryDI,
            itemTransactionRepositoryDI,
            conversationMessagesRepositoryDI,
            conversationRepositoryDI,
            userConversationsRepositoryDI,
            conversationMessagesMembersRepositoryDI,
            statusActionsRepositoryDI,
            statusProjectsRepositoryDI,
            statusRepositoryDI,
            invoiceRepositoryDI,
            commentRepositoryDI,
            invoiceItemRepositoryDI,
            invoiceUserRepositoryDI,
            userInvoiceValuesRepositoryDI,
            processChainRepositoryDI,
            processRepositoryDI,
            processChainStateRepositoryDI,
            processChainPrivilegesRepositoryDI,
            processChainActionInjectionRepositoryDI,
            cmsElementsProjectRepositoryDI,
            cmsMenuItemsProjectRepositoryDI,
            cmsMenuProjectsRepositoryDI,
            cmsMenuItemsPrivilegesProjectRepositoryDI,
            cmsPageProjectsRepositoryDI,
            cmsPagePrivilegesProjectRepositoryDI
        }
    };




    get cmsPagePrivilegesProjectRepository() {
        return this.repositories.cmsPagePrivilegesProjectRepositoryDI;
    }


    get cmsPageProjectsRepository() {
        return this.repositories.cmsPageProjectsRepositoryDI;
    }


    get cmsMenuItemsProjectRepository() {
        return this.repositories.cmsMenuItemsProjectRepositoryDI;
    }


    get cmsMenuProjectsRepository() {
        return this.repositories.cmsMenuProjectsRepositoryDI;
    }


    get cmsMenuItemsPrivilegesProjectRepository() {
        return this.repositories.cmsMenuItemsPrivilegesProjectRepositoryDI;
    }


    get cmsElementsProjectRepository() {
        return this.repositories.cmsElementsProjectRepositoryDI;
    }

    /**
             * 
             * @return {ProcessChainActionInjectionRepository}
             * @readonly
             * @memberof UnitOfWork
             */
    get processChainActionInjectionRepository() {
        return this.repositories.processChainActionInjectionRepositoryDI;
    }

    /**
            * 
            * @return {ProcessChainPrivilegesRepository}
            * @readonly
            * @memberof UnitOfWork
            */
    get processChainPrivilegesRepository() {
        return this.repositories.processChainPrivilegesRepositoryDI;
    }
    /**
        * 
        * @return {ProcessChainStateRepository}
        * @readonly
        * @memberof UnitOfWork
        */
    get processChainStateRepository() {
        return this.repositories.processChainStateRepositoryDI;
    }

    /**
                     * 
                     * @return {ProcessChainRepository}
                     * @readonly
                     * @memberof UnitOfWork
                     */
    get processChainRepository() {
        return this.repositories.processChainRepositoryDI;
    }
    /**
                     * 
                     * @return {ProcessRepository}
                     * @readonly
                     * @memberof UnitOfWork
                     */
    get processRepository() {
        return this.repositories.processRepositoryDI;
    }
    /**
          * 
          * @return {UserInvoiceValuesRepository}
          * @readonly
          * @memberof UnitOfWork
          */
    get userInvoiceValuesRepository() {
        return this.repositories.userInvoiceValuesRepositoryDI;
    }

    /**
         * 
         * @return {InvoiceUserRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get invoiceUserRepository() {
        return this.repositories.invoiceUserRepositoryDI;
    }

    /**
         * 
         * @return {InvoiceItemRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get invoiceItemRepository() {
        return this.repositories.invoiceItemRepositoryDI;
    }


    
    get commentRepository() {
        return this.repositories.commentRepositoryDI;
    }
    /**
         * 
         * @return {InvoiceRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get invoiceRepository() {
        return this.repositories.invoiceRepositoryDI;
    }


    /**
         * 
         * @return {StatusRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get statusRepository() {
        return this.repositories.statusRepositoryDI;
    }



    /**
         * 
         * @return {StatusProjectsRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get statusProjectsRepository() {
        return this.repositories.statusProjectsRepositoryDI;
    }

    /**
         * 
         * @return {StatusActionsRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get statusActionsRepository() {
        return this.repositories.statusActionsRepositoryDI;
    }

    /**
         * 
         * @return {ConversationMessagesMembersRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get conversationMessagesMembersRepository() {
        return this.repositories.conversationMessagesMembersRepositoryDI;
    }

    /**
         * 
         * @return {UserConversationsRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get userConversationsRepository() {
        return this.repositories.userConversationsRepositoryDI;
    }
    /**
     * 
     * @return {ConversationRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get conversationRepository() {
        return this.repositories.conversationRepositoryDI;
    }
    /**
     * 
     * @return {ConversationMessagesRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get conversationMessagesRepository() {
        return this.repositories.conversationMessagesRepositoryDI;
    }


    /**
        * 
        * @return {ItemTransactionCategoryOptionsRepository}
        * @readonly
        * @memberof UnitOfWork
        */
    get itemTransactionCategoryOptionsRepository() {
        return this.repositories.itemTransactionCategoryOptionsRepositoryDI;
    }
    /**
    * 
    * @return {ItemUserActionRepository}
    * @readonly
    * @memberof UnitOfWork
    */
    get itemUserActionRepository() {
        return this.repositories.itemUserActionRepositoryDI;
    }
    /**
    * 
    * @return {ItemTransactionsRepository}
    * @readonly
    * @memberof UnitOfWork
    */
    get itemTransactionRepository() {
        return this.repositories.itemTransactionRepositoryDI;
    }
    /**
    * 
    * @return {SeoRepository}
    * @readonly
    * @memberof UnitOfWork
    */
    get seoRepository() {
        return this.repositories.seoRepositoryDI;
    }
    /**
        * 
        * @return {SeoRepository}
        * @readonly
        * @memberof UnitOfWork
        */
    get seoRepository() {
        return this.repositories.seoRepositoryDI;
    }
    /**
     * 
     * @return {MailSendersRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get mailSendersRepository() {
        return this.repositories.mailSendersRepositoryDI;
    }
    /**
     * 
     * @return {MailTypesProjectRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get mailTypesProjectRepository() {
        return this.repositories.mailTypesProjectRepositoryDI;
    }
    /**
     * 
     * @return {MailPartsRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get mailPartsRepository() {
        return this.repositories.mailPartsRepositoryDI;
    }

    /**
     * 
     * @return {MailTypesRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get mailTypesRepository() {
        return this.repositories.mailTypesRepositoryDI;
    }
    /**
     * 
     * @return {DimensionsProjectRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get dimensionsProjectRepository() {
        return this.repositories.dimensionsProjectRepositoryDI;
    }
    /**
     * 
     * @return {DimensionsRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get dimensionsRepository() {
        return this.repositories.dimensionsRepositoryDI;
    }
    /**
     * 
     * @return {LanguageRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get languageRepository() {
        return this.repositories.languageRepositoryDI;
    }
    /**
     * 
     * @return {LanguageProjectRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get languageProjectRepository() {
        return this.repositories.languageProjectRepositoryDI;
    }

    /**
     * 
     * @return {ActionPrivilegesRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get actionPrivilegesRepository() {
        return this.repositories.actionPrivilegesRepositoryDI;
    }

    /**
     * 
     * @return {ActionProjectRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get actionProjectRepository() {
        return this.repositories.actionProjectRepositoryDI;
    }
    /**
     * 
     * @return {ActionRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get actionRepository() {
        return this.repositories.actionRepositoryDI;
    }

    /**
      * 
      * @return {CategoryActionsRepository}
      * @readonly
      * @memberof UnitOfWork
      */
    get categoryActionsRepository() {
        return this.repositories.categoryActionsRepositoryDI;
    }

    /**
      * 
      * @return {PrivilegeProjectRepository}
      * @readonly
      * @memberof UnitOfWork
      */
    get privilegeProjectRepository() {
        return this.repositories.privilegeProjectRepositoryDI;
    }

    /**
      * 
      * @return {RolesProjectRepository}
      * @readonly
      * @memberof UnitOfWork
      */
    get rolesProjectRepository() {
        return this.repositories.rolesProjectRepositoryDI;
    }



    /**
    * 
    * @return {UserRolesRepository}
    * @readonly
    * @memberof UnitOfWork
    */
    get userRolesRepository() {
        return this.repositories.userRolesRepositoryDI;
    }


    /**
     * 
     * @return {UserTypesRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get userTypesRepository() {
        return this.repositories.userTypesRepositoryDI;
    }


    /**
          * 
          * @return {UserTypesRolesRepository}
          * @readonly
          * @memberof UnitOfWork
          */
    get userTypesRolesRepository() {
        return this.repositories.userTypesRolesRepositoryDI;
    }

    /**
       * 
       * @return {RolesRepository}
       * @readonly
       * @memberof UnitOfWork
       */
    get rolesRepository() {
        return this.repositories.rolesRepositoryDI;
    }

    /**
     * 
     * @return {TranslationRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get translationRepository() {
        return this.repositories.translationRepositoryDI;
    }

    /**
     * 
     * @return {UserRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get userRepository() {
        return this.repositories.userRepositoryDI;
    }

    /**
    * 
    * @return {PrivilegeRepository}
    * @readonly
    * @memberof UnitOfWork
    */
    get privilegeRepository() {
        return this.repositories.privilegeRepositoryDI;
    }

    /**
     * 
     * @return {ProjectRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get projectRepository() {
        return this.repositories.projectRepositoryDI;
    }

    get configRepository() {
        return this.repositories.configRepositoryDI;

    }

    /**
     * 
     * @return {TagRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get tagRepository() {
        return this.repositories.tagRepositoryDI;
    }

    /**
     * 
     * @return {ItemCategoryOptionRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get itemCategoryOptionRepository() {
        return this.repositories.itemCategoryOptionRepositoryDI;
    }

    /**
    * 
    * @return {CategoryOptionsRepository}
    * @readonly
    * @memberof UnitOfWork
    */
    get categoryOptionsRepository() {
        return this.repositories.categoryOptionsRepositoryDI
    }

    /**
    * 
    * @return {UserAuthRepository}
    * @readonly
    * @memberof UnitOfWork
    */
    get userAuthRepository() {
        return this.repositories.userAuthRepositoryDI;
    }

    /**
    * 
    * @return {BlobRepository}
    * @readonly 
    * @memberof UnitOfWork
    */
    get blobRepository() {
        return this.repositories.blobRepositoryDI;
    }
    /**
       * 
       * @return {BlobMapperRepository}
       * @readonly
       * @memberof UnitOfWork
       */
    get blobMapperRepository() {
        return this.repositories.blobMapperRepositoryDI;
    }

    /**
     * @return {CategoryHierarchyRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get categoryHierarchyRepository() {
        return this.repositories.categoryHierarchyRepositoryDI;
    }


    /**
     *  
     * @return {CategoryRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get categoryRepository() {
        return this.repositories.categoryRepositoryDI;
    }


    /**
     * 
     * @return {ItemRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get itemRepository() {
        return this.repositories.itemRepositoryDI;
    }


    /**
     * 
     * @return {CountryRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get countryRepository() {
        return this.repositories.countryRepositoryDI;
    }

    /**
      * 
      * @return {CityRepository}
      * @readonly
      * @memberof UnitOfWork
      */
    get cityRepository() {
        return this.repositories.cityRepositoryDI;
    }   /**


    
    /**
     *  
     * @return {ItemCategoryRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get itemCategoryRepository() {
        return this.repositories.itemCategoryRepositoryDI;
    }

    /**
     *  
     * @return {TextRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get textRepository() {
        return this.repositories.textRepositoryDI;
    }


}

