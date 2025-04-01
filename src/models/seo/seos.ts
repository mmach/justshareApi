'use strict';


/**
 * Interface for Seos attributes
 */
export interface SeosDTO {
  id: string;
  project_id?: string;
  fb_app_id?: string;
  fb_type?: string;
  fb_title?: string;
  fb_image?: string;
  fb_description?: string;
  fb_site_name?: string;
  fb_url?: string;
  sitemap_gen?: string;
  sitemap_add_json?: string;
}
