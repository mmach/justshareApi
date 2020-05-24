"use strict";

import BaseUnitOfWork from "./Architecture/baseUnitOfWork.js";
import CategoryRepository from "./Repository/categoryRepository.js";
import UserRepository from "./Repository/userRepository.js";
import CategoryHierarchyRepository from "./Repository/categoryHierarchyRepository.js";
import BlobRepository from "./Repository/blobRepository.js";
import BlobMapperRepository from "./Repository/blobMapperRepository.js";
import ItemCategoryRepository from "./Repository/itemCategoryRepository.js";
import ItemRepository from "./Repository/itemRepository.js";
import TextRepository from "./Repository/textRepository.js";
import CountryRepository from "./Repository/countryRepository.js";
import CityRepository from "./Repository/cityRepository.js";
import UserAuthRepository from "./Repository/userAuthRepository.js";
import CategoryOptionsRepository from "./Repository/categoryOptionsRepository.js";
import ItemCategoryOptionRepository from "./Repository/itemCategoryOptionRepository.js";
import TagRepository from "./Repository/tagRepository.js";
import ProjectRepository from "./Repository/projectRepository.js";
import ConfigRepository from "./Repository/configRepository.js";
import UserProjectPrivilegesRepository from "./Repository/userProjectPrivilegesRepository.js";
import PrivilegeRepository from "./Repository/privilegeRepository.js";
import ActionPrivilegesRepository from "./Repository/actionPrivilegesRepository.js";
import ActionProjectRepository from "./Repository/actionProjectRepository.js";
import ActionRepository from "./Repository/actionRepository.js";
import CategoryActionsRepository from "./Repository/categoryActionsRepository.js";
import PrivilegeProjectRepository from "./Repository/privilegeProjectRepository.js";
import RolesProjectRepository from "./Repository/rolesProjectRepository.js";
import UserRolesRepository from "./Repository/userRolesRepository.js";
import UserTypesRepository from "./Repository/userTypesRepository.js";
import UserTypesRolesRepository from "./Repository/userTypesRolesRepository.js";
import RolesRepository from "./Repository/rolesRepository.js";
import TranslationRepository from "./Repository/translationRepository.js";
import LanguageProjectRepository from "./Repository/languageProjectRepository.js";
import LanguageRepository from "./Repository/languageRepository.js";
import DimensionsRepository from "./Repository/dimensionsRepository.js";
import DimensionsProjectRepository from "./Repository/dimensionsProjectRepository.js";








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
        dimensionsRepositoryDI
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
            dimensionsProjectRepositoryDI
        }
    };


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

