import { IBaseRepositoryType } from '../../Architecture';
import { BlobDBO } from '../../DBO/index.js';
import { Blob } from '../../Domain/index.js';



export interface IBlobRepository extends IBaseRepositoryType<BlobDBO, Blob> {
  getByGuids({ ids, transaction }: { ids: string[]; transaction?: number }): Promise<object[]>;
  getProjectsItemsStorage({ transaction }: { transaction?: number }): Promise<Blob[]>;
  getProjectsCategoriesStorage({ transaction }: { transaction?: number }): Promise<Blob[]>;
  getProjectsUsersStorage({ transaction }: { transaction?: number }): Promise<Blob[]>;
  getProjectsStorage({ transaction }: { transaction?: number }): Promise<Blob[]>;
  insertFile({ id, path, name, transaction }: { id: string; path: string; name: string; transaction?: number }): Promise<object[]>;
  getBlobs({ userId, itemId, transaction }: { userId: string | null | undefined; itemId: string | null | undefined; transaction?: number }): Promise<Blob[]>;
  getUnverified({ transaction }: { transaction?: number }): Promise<Blob[]>;
  verifyImage({ blob, transaction }: { blob: BlobDBO; transaction?: number }): Promise<[affectedCount: number]>;
  getBlobsCategory({ category_id, transaction }: { category_id: string; transaction?: number }): Promise<Blob[]>;
}