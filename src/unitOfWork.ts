"use strict";

import { BaseUnitOfWork } from "./Architecture/Base/baseUnitOfWork.js";
import { REPOSITORIES } from "./Repository/type.js";

export default class UnitOfWork extends BaseUnitOfWork {

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
        //textRepositoryDI,
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
    }: REPOSITORIES) {
        super()

        this.transaction = null;
        this.repositories = {
            //   textRepositoryDI,
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


    get processChainActionInjectionRepository() {
        return this.repositories.processChainActionInjectionRepositoryDI;
    }


    get processChainPrivilegesRepository() {
        return this.repositories.processChainPrivilegesRepositoryDI;
    }

    get processChainStateRepository() {
        return this.repositories.processChainStateRepositoryDI;
    }



    get processChainRepository() {
        return this.repositories.processChainRepositoryDI;
    }

    get processRepository() {
        return this.repositories.processRepositoryDI;
    }

    get userInvoiceValuesRepository() {
        return this.repositories.userInvoiceValuesRepositoryDI;
    }


    get invoiceUserRepository() {
        return this.repositories.invoiceUserRepositoryDI;
    }

    get invoiceItemRepository() {
        return this.repositories.invoiceItemRepositoryDI;
    }



    get commentRepository() {
        return this.repositories.commentRepositoryDI;
    }

    get invoiceRepository() {
        return this.repositories.invoiceRepositoryDI;
    }


    get statusRepository() {
        return this.repositories.statusRepositoryDI;
    }

    get statusProjectsRepository() {
        return this.repositories.statusProjectsRepositoryDI;
    }

    get statusActionsRepository() {
        return this.repositories.statusActionsRepositoryDI;
    }


    get conversationMessagesMembersRepository() {
        return this.repositories.conversationMessagesMembersRepositoryDI;
    }


    get userConversationsRepository() {
        return this.repositories.userConversationsRepositoryDI;
    }

    get conversationRepository() {
        return this.repositories.conversationRepositoryDI;
    }

    get conversationMessagesRepository() {
        return this.repositories.conversationMessagesRepositoryDI;
    }

    get itemTransactionCategoryOptionsRepository() {
        return this.repositories.itemTransactionCategoryOptionsRepositoryDI;
    }

    get itemUserActionRepository() {
        return this.repositories.itemUserActionRepositoryDI;
    }

    get itemTransactionRepository() {
        return this.repositories.itemTransactionRepositoryDI;
    }

    get seoRepository() {
        return this.repositories.seoRepositoryDI;
    }


    get mailSendersRepository() {
        return this.repositories.mailSendersRepositoryDI;
    }

    get mailTypesProjectRepository() {
        return this.repositories.mailTypesProjectRepositoryDI;
    }

    get mailPartsRepository() {
        return this.repositories.mailPartsRepositoryDI;
    }


    get mailTypesRepository() {
        return this.repositories.mailTypesRepositoryDI;
    }

    get dimensionsProjectRepository() {
        return this.repositories.dimensionsProjectRepositoryDI;
    }

    get dimensionsRepository() {
        return this.repositories.dimensionsRepositoryDI;
    }

    get languageRepository() {
        return this.repositories.languageRepositoryDI;
    }

    get languageProjectRepository() {
        return this.repositories.languageProjectRepositoryDI;
    }


    get actionPrivilegesRepository() {
        return this.repositories.actionPrivilegesRepositoryDI;
    }


    get actionProjectRepository() {
        return this.repositories.actionProjectRepositoryDI;
    }

    get actionRepository() {
        return this.repositories.actionRepositoryDI;
    }

    get categoryActionsRepository() {
        return this.repositories.categoryActionsRepositoryDI;
    }


    get privilegeProjectRepository() {
        return this.repositories.privilegeProjectRepositoryDI;
    }

    get rolesProjectRepository() {
        return this.repositories.rolesProjectRepositoryDI;
    }


    get userRolesRepository() {
        return this.repositories.userRolesRepositoryDI;
    }


    get userTypesRepository() {
        return this.repositories.userTypesRepositoryDI;
    }

    get userTypesRolesRepository() {
        return this.repositories.userTypesRolesRepositoryDI;
    }

    get rolesRepository() {
        return this.repositories.rolesRepositoryDI;
    }


    get translationRepository() {
        return this.repositories.translationRepositoryDI;
    }


    get userRepository() {
        return this.repositories.userRepositoryDI;
    }


    get privilegeRepository() {
        return this.repositories.privilegeRepositoryDI;
    }


    get projectRepository() {
        return this.repositories.projectRepositoryDI;
    }

    get configRepository() {
        return this.repositories.configRepositoryDI;

    }


    get tagRepository() {
        return this.repositories.tagRepositoryDI;
    }


    get itemCategoryOptionRepository() {
        return this.repositories.itemCategoryOptionRepositoryDI;
    }


    get categoryOptionsRepository() {
        return this.repositories.categoryOptionsRepositoryDI
    }


    get userAuthRepository() {
        return this.repositories.userAuthRepositoryDI;
    }


    get blobRepository() {
        return this.repositories.blobRepositoryDI;
    }

    get blobMapperRepository() {
        return this.repositories.blobMapperRepositoryDI;
    }


    get categoryHierarchyRepository() {
        return this.repositories.categoryHierarchyRepositoryDI;
    }


    get categoryRepository() {
        return this.repositories.categoryRepositoryDI;
    }


    get itemRepository() {
        return this.repositories.itemRepositoryDI;
    }



    get countryRepository() {
        return this.repositories.countryRepositoryDI;
    }

    get cityRepository() {
        return this.repositories.cityRepositoryDI;
    }   

    get itemCategoryRepository() {
        return this.repositories.itemCategoryRepositoryDI;
    }
    /*
      
        get textRepository() {
            return this.repositories.textRepositoryDI;
        }
    
    */
}

