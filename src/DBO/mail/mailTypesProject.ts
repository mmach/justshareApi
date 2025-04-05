'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { TranslationsDBO } from "../translations";
import { MailPartsDBO } from "./mailParts";
import { MailSendersDBO } from "./mailSenders";
import { MailTypesDBO } from "./mailTypes";

/**
 * Interface for MailTypesProjects attributes
 */
export interface MailTypesProjectsDBO extends BaseDBO{
  id: string;
  translation_id?: string;
  mailsender_id?: string;
  mail_body_id?: string;
  mail_template_id?: string;
  mailtype_id?: string;
  project_id?: string;

  translation?: TranslationsDBO;
  mailsender?: MailSendersDBO;
  body?: MailPartsDBO;
  template?: MailPartsDBO;
  mailtype?: MailTypesDBO;
}
