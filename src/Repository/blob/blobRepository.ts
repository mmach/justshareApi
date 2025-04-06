import { IBaseRepositoryType } from '../../Architecture';
import { BlobDBO } from '../../DBO/index.js';
import { Blob } from '../../Domain/index.js';


export interface IBlobRepository extends IBaseRepositoryType<BlobDBO, Blob> {
  getByGuids({ ids, transaction }: { ids: string[]; transaction?: number }): Promise<any>;
  getProjectsItemsStorage({ transaction }: { transaction?: number }): Promise<any>;
  getProjectsCategoriesStorage({ transaction }: { transaction?: number }): Promise<any>;
  getProjectsUsersStorage({ transaction }: { transaction?: number }): Promise<any>;
  getProjectsStorage({ transaction }: { transaction?: number }): Promise<any>;
  insertFile({ id, path, name, transaction }: { id: string; path: string; name: string; transaction?: number }): Promise<any>;
  getBlobs({ userId, itemId, transaction }: { userId: string | null | undefined; itemId: string | null | undefined; transaction?: number }): Promise<any>;
  getUnverified({ transaction }: { transaction?: number }): Promise<any>;
  verifyImage({ blob, transaction }: { blob: BlobDBO; transaction?: number }): Promise<any>;
  getBlobsCategory({ category_id, transaction }: { category_id: string; transaction?: number }): Promise<any>;
}
