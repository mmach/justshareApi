'use strict';

import { TranslationsDTO } from "../translations";
import { MailPartsDTO } from "./mailParts";
import { MailSendersDTO } from "./mailSenders";
import { MailTypesDTO } from "./mailTypes";

/**
 * Interface for MailTypesProjects attributes
 */
export interface MailTypesProjectsDTO {
  id: string;
  translation_id?: string;
  mailsender_id?: string;
  mail_body_id?: string;
  mail_template_id?: string;
  mailtype_id?: string;
  project_id?: string;

  translation?: TranslationsDTO;
  mailsender?: MailSendersDTO;
  body?: MailPartsDTO;
  template?: MailPartsDTO;
  mailtype?: MailTypesDTO;
}
