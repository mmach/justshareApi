export interface UploadBlobDTO {
  id: string; blob: string; type: string; filename: string;
}
export interface UploadBlobIdsDTO {
  blob_id: string;
  blob_min_id: string;
  blob_thumb_id: string;
}
export interface BlobFileDTO {
  path: string;
  id: string;
  filename: string;
  type?: string;
}
