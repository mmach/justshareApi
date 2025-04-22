import { ACTIONS_REPOSITORY } from "./actions/type";
import { BLOB_REPOSITORY } from "./blob/type";
import { CATEGORY_REPOSITORY } from "./category/type";
import { CMS_REPOSITORY } from "./cms/type";
import { COMMENTS_REPOSITORY } from "./comments/type";
import { CONFIG_REPOSITORY } from "./config/type";
import { CONVERSATION_REPOSITORY } from "./conversation/type";
import { DIMENSIONS_REPOSITORY } from "./dimensions/type";
import { INVOICE_REPOSITORY } from "./invoice/type";
import { ITEM_REPOSITORY } from "./item/type";
import { LANGUAGE_REPOSITORY } from "./language/type";
import { LOCATION_REPOSITORY } from "./location/type";
import { MAIL_REPOSITORY } from "./mail/type";
import { PRIVILEGES_REPOSITORY } from "./privileges/type";
import { PROCESS_REPOSITORY } from "./process/type";
import { PROJECT_REPOSITORY } from "./project/type";
import { ROLES_REPOSITORY } from "./roles/type";
import { SEO_REPOSITORY } from "./seo/type";
import { STATUS_REPOSITORY } from "./status/type";
import { TAG_REPOSITORY } from "./tag/type";
import { TRANSLATIONS_REPOSITORY } from "./translations/type";
import { USER_REPOSITORY } from "./user/type";

export type REPOSITORIES = ACTIONS_REPOSITORY &
    BLOB_REPOSITORY &
    CATEGORY_REPOSITORY &
    CMS_REPOSITORY &
    COMMENTS_REPOSITORY &
    CONFIG_REPOSITORY &
    CONVERSATION_REPOSITORY &
    DIMENSIONS_REPOSITORY &
    INVOICE_REPOSITORY &
    ITEM_REPOSITORY &
    LANGUAGE_REPOSITORY &
    LOCATION_REPOSITORY &
    MAIL_REPOSITORY &
    PRIVILEGES_REPOSITORY &
    PROCESS_REPOSITORY &
    PROJECT_REPOSITORY &
    ROLES_REPOSITORY &
    SEO_REPOSITORY & 
    STATUS_REPOSITORY&
    TAG_REPOSITORY & 
    TRANSLATIONS_REPOSITORY &
    USER_REPOSITORY