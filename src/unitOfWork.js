"use strict";

import BaseUnitOfWork from "./Architecture/baseUnitOfWork.js";
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
import CmsElementsProjectRepository from "./Repository/cmsElementsProjectRepository.js";
import CmsMenuItemsPrivilegesProjectRepository from "./Repository/cmsMenuItemsPrivilegesProjectRepository.js";
import CmsMenuItemsProjectsRepository from "./Repository/cmsMenuItemsProjectRepository.js";
import CmsMenuProjectsRepository from "./Repository/cmsMenuProjectRepository.js";
import CmsPageProjectsRepository from "./Repository/cmsPageProjectsRepository.js";
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
import TextRepository from "./Repository/textRepository.js";
import TranslationRepository from "./Repository/translationRepository.js";
import UserAuthRepository from "./Repository/userAuthRepository.js";
import UserConversationsRepository from "./Repository/userConversationsRepository.js";
import UserInvoiceValuesRepository from "./Repository/userInvoiceValuesRepository.js";
import UserProjectPrivilegesRepository from "./Repository/userProjectPrivilegesRepository.js";
import UserRepository from "./Repository/userRepository.js";
import UserRolesRepository from "./Repository/userRolesRepository.js";
import UserTypesRepository from "./Repository/userTypesRepository.js";
import UserTypesRolesRepository from "./Repository/userTypesRolesRepository.js";







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
        cmsPageProjectsRepositoryDI
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
            cmsPageProjectsRepositoryDI
        }
    };



    /**
             * 
             * @return {CmsPageProjectsRepository}
             * @readonly
             * @memberof UnitOfWork
             */
    get cmsPageProjectsRepositor() {
        return this.repositories.cmsPageProjectsRepositoryDI;
    }

    /**
         * 
         * @return {CmsMenuItemsProjectsRepository}
         * @readonly
         * @memberof UnitOfWork
         */
    get cmsMenuItemsProjectRepository() {
        return this.repositories.cmsMenuItemsProjectRepositoryDI;
    }

    /**
     * 
     * @return {CmsMenuProjectsRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get cmsMenuProjectsRepository() {
        return this.repositories.cmsMenuProjectsRepositoryDI;
    }

    /**
 * 
 * @return {CmsMenuItemsPrivilegesProjectRepository}
 * @readonly
 * @memberof UnitOfWork
 */
    get cmsMenuItemsPrivilegesProjectRepository() {
        return this.repositories.cmsMenuItemsPrivilegesProjectRepositoryDI;
    }

    /**
         * 
         * @return {CmsElementsProjectRepository}
         * @readonly
         * @memberof UnitOfWork
         */
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


    /**
         * 
         * @return {CommentRepository}
         * @readonly
         * @memberof UnitOfWork
         */
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

    /**
    * 
    * @return {ConfigRepository}
    * @readonly
    * @memberof UnitOfWork
    */
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

