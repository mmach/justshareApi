'use strict';


/**
 * Interface for MailTypes attributes
 */
export interface MailTypesDTO {
  id: string;
  token?: string;
  description?: string;
  bodyPayload?: string;
  templatePayload?: string;
  body?: string;
  templateBody?: string;
}
