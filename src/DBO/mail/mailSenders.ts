'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { TranslationsDBO } from "../translations";

/**
 * Interface for MailSenders attributes
 */
export interface MailSendersDBO extends BaseDBO{
  id: string;
  translation_id?: string;
  email?: string;
  password?: string;
  sendgrid_key?: string;
  smtp_host?: string;
  smtp_port?: string;
  smtp_security?: boolean;
  project_id?: string;

  translation?: TranslationsDBO;

}
