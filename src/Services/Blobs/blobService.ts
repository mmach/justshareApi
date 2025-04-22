import { IBaseServiceType } from "../../Architecture";
import { BlobDBO } from "../../DBO";
import { Blob } from "../../Domain";

interface UploadBlobDTO {
  id: string, blob: string; type: string; filename: string
}
interface UploadBlobIdsDTO {
  blob_id: string,
  blob_min_id: string,
  blob_thumb_id: string
}
interface BlobFileDTO {
  path: string,
  id: string,
  filename: string,
  type?: string
}


export interface IBlobService extends IBaseServiceType<BlobDBO, Blob> {
  getProjectsStorage({ model }: { model: { type: string } }): Promise<Blob[] | undefined> ;
  uploadImage({ blob }: { blob: UploadBlobDTO }): Promise<UploadBlobIdsDTO>;
  uploadIcon({ blob }: { blob: UploadBlobDTO }): Promise<{ blob_id: string }>;
  uploadUserImage({ blob }: { blob: UploadBlobDTO }): Promise<Blob>;
  uploadUserProject({ blob }: { blob: UploadBlobDTO }): Promise<Blob>;
  uploadImageAndSave({ blob, itemId }: { blob: UploadBlobDTO; itemId: string | null }): Promise<Blob>;
  uploadCategoriesIconAndSave({ blob, category_id }: { blob: UploadBlobDTO; category_id: string }): Promise<void>;
  uploadProjectImage({ blob }: { blob: UploadBlobDTO & { dest: string } }): Promise<number>;
  getBlobsBase64ByGuids({ ids }: { ids: string[] }): Promise<any[]>;
  getBlobs({ userId, itemId }: { userId: string | null | undefined; itemId: string | null | undefined }): Promise<BlobDBO[]>;
  getUnverified({}): Promise<BlobDBO[]>;
  verifyImage({ blob }: { blob: BlobDBO }): Promise<[affectedCount: number]>;
}

