'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for MailTypes attributes
 */
export interface MailTypesDBO extends BaseDBO{
  id: string;
  token?: string;
  description?: string;
  bodyPayload?: string;
  templatePayload?: string;
  body?: string;
  templateBody?: string;
}
