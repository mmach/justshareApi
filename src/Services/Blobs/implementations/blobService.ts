import Jimp from "jimp";
import { v4 } from "uuid";
import { ServerException, BaseServiceType } from "../../../Architecture";
import CONFIG from "../../../config";
import { BlobDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { IBlobService } from "../blobService";
import fs from "fs-extra";
import { Blob } from "../../../Domain";
import path from 'path';
import {mkdirSync,existsSync} from 'fs'
import { UploadBlobDTO, UploadBlobIdsDTO, BlobFileDTO } from "../../../Dto/Blob/UploadBlobDTO";
import packPath from "package-json-path";

var dir = packPath(path.join('upload'));
dir=dir.replace('package.json','').substring(0, dir.length-1);

if (!existsSync(dir)) {
    mkdirSync(dir);
}
let upload_path = dir;//process.env.UPLOAD_PATH || CONFIG.UPLOAD_PATH
let saveBlobToFile = async ({ blob }: { blob: { blob: string, type: string, } }): Promise<{
  path: string,
  id: string,
  filename: string,
  type: string
}> => {
  let newUid = v4();
  if (blob.blob.indexOf("base64,") > 0) {
    blob.blob = blob.blob.split("base64,")[1];
  }
  switch (blob.type) {
    case "image/jpeg": {
      let fd = await fs.open(`${upload_path}/${newUid}.jpg`, "w+");
      var nodeBuffer = Buffer.from(blob.blob, "base64");
      let result = await fs.write(fd, new Uint8Array(nodeBuffer));
      await fs.close(fd);

      return {
        path: `${upload_path}/${newUid}.jpg`,
        id: newUid,
        filename: `${newUid}.jpg`,
        type: 'jpg'

      };
      break;
    }
    case "image/png": {
      let fd = await fs.open(`${upload_path}/${newUid}.png`, "w+");
      //ts-ignore
      //let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
      await fs.close(fd);


      return {
        path: `${upload_path}/${newUid}.png`,
        id: newUid,
        filename: `${newUid}.png`,
        type: 'png'

      };
      break;
    }
    case "image/webp": {
      let fd = await fs.open(`${upload_path}/${newUid}.webp`, "w+");
      //ts-ignore
      //let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
      await fs.close(fd);


      return {
        path: `${upload_path}/${newUid}.webp`,
        id: newUid,
        filename: `${newUid}.webp`,
        type: 'webp'

      };
      break;
    }
    case "image/svg+xml": {
      let fd = await fs.open(`${upload_path}/${newUid}.svg`, "w+");
      //ts-ignore
      //let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
      await fs.close(fd);


      return {
        path: `${upload_path}/${newUid}.svg`,
        id: newUid,
        filename: `${newUid}.svg`,
        type: 'svg'
      };
      break;
    }
    case "application/pdf": {
      let fd = await fs.open(`${upload_path}/${newUid}.pdf`, "w+");
      ///let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
      await fs.close(fd);
      console.log('PDF')

      return {
        path: `${upload_path}/${newUid}.pdf`,
        id: newUid,
        filename: `${newUid}.pdf`,
        type: 'pdf'
      };
      break;
    }
    default:
      throw new ServerException();
  }
};



export default class BlobService extends BaseServiceType<BlobDBO, Blob> implements IBlobService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'blobRepository' });
  }

  async getProjectsStorage({ model }: { model: { type: string } }): Promise<Blob[] | undefined> {
    switch (model.type) {
      case 'ITEMS': return await this.unitOfWorkDI.blobRepository.getProjectsItemsStorage({})
      case 'PROJECT': return await this.unitOfWorkDI.blobRepository.getProjectsStorage({})
      case 'USERS': return await this.unitOfWorkDI.blobRepository.getProjectsUsersStorage({})
      case 'CATEGORIES': return await this.unitOfWorkDI.blobRepository.getProjectsCategoriesStorage({})
    }
  }

  async uploadImage({ blob }: { blob: UploadBlobDTO }): Promise<UploadBlobIdsDTO> {
    let newBlob: Partial<BlobFileDTO> = {};
    try {
      newBlob = await saveBlobToFile.bind(this)({ blob });
      if (newBlob.type != 'svg' && newBlob.type != 'webp' && newBlob.type != 'pdf') {
        let imgNormal = await Jimp.read(newBlob.path!);

        await imgNormal
          .contain(800, 800 * imgNormal.bitmap.height / imgNormal.bitmap.width)//300, 300) // resize
          .quality(100) // set JPEG quality
          .writeAsync(`${upload_path}/${newBlob.id}-thumb.` + newBlob.type); // save

        await imgNormal
          .contain(300, 300 * imgNormal.bitmap.height / imgNormal.bitmap.width) // resize
          .quality(100) // set JPEG quality
          .writeAsync(`${upload_path}/${newBlob.id}-min.` + newBlob.type); // save

      }
      let blob_id = await this.insertFile({
        id: blob.id,
        path: newBlob.path!,
        filename: newBlob.filename!
      });
      if (newBlob.type != 'svg' && newBlob.type != 'webp' && newBlob.type != 'pdf') {
        let uid_min = v4()
        let blob_min_id = await this.insertFile({
          id: uid_min,
          path: `${upload_path}/${newBlob.id}-min.` + newBlob.type,
          filename: `${newBlob.id}-min.` + newBlob.type
        });
        let uid_thumb = v4()
        let blob_thumb_id = await this.insertFile({
          id: uid_thumb,
          path: `${upload_path}/${newBlob.id}-thumb.` + newBlob.type,
          filename: `${newBlob.id}-thumb.` + newBlob.type
        });
        return {
          blob_id: blob_id,
          blob_min_id: blob_min_id,
          blob_thumb_id: blob_thumb_id
        };
      } else {

        return {
          blob_id: blob_id,
          blob_min_id: blob_id,
          blob_thumb_id: blob_id
        }
      }
      ///write to db
    } catch (exception: any) {
      console.log(exception)

      console.log(exception.parent.message);
      throw exception.parent.message
    } finally {
      await fs.unlink(`${newBlob.path}`);

      if (newBlob.type != 'svg' && newBlob.type != 'webp' && newBlob.type != 'pdf') {
        await fs.unlink(`${upload_path}/${newBlob.id}-min.` + newBlob.type);
        await fs.unlink(`${upload_path}/${newBlob.id}-thumb.` + newBlob.type);
      }

    }
  }

  async uploadIcon({ blob }: { blob: UploadBlobDTO }): Promise<{ blob_id: string; }> {
    let newBlob: Partial<{
      path: string,
      id: string,
      filename: string,
      type: string
    }> = {};
    try {
      newBlob = await saveBlobToFile.bind(this)({ blob });
      let imgNormal = await Jimp.read(newBlob.path!);

      await imgNormal
        .contain(50, 50) // resize
        .quality(60) // set JPEG quality
        .writeAsync(`${upload_path}/${newBlob.id}-icon.png`); // save
      let blob_id = await this.insertFile({
        id: blob.id,
        path: newBlob.path!,
        filename: newBlob.filename!
      });


      return {
        blob_id: blob_id

      };
      ///write to db
    } catch (exception: any) {
      console.log(exception.parent.message);
      throw exception.parent.message
    } finally {
      console.log(newBlob.path)

      await fs.unlink(`${newBlob.path}`);

    }
  }




  async insertFile({ id, path, filename }: BlobFileDTO): Promise<string> {
    let result = await this.unitOfWorkDI.blobRepository.insertFile({
      id: id,
      path: path,
      name: filename
    });
    return (result[0] as { id: string }).id;
  }

  async uploadUserImage({ blob }: { blob: UploadBlobDTO }): Promise<Blob> {
    return await this.uploadImageAndSave({ blob, itemId: null })
  }

  async uploadUserProject({ blob }: { blob: UploadBlobDTO }): Promise<Blob> {
    let newImages = await this.uploadImage({ blob });
    let result: Partial<BlobDBO> = {
      blob_id: newImages.blob_id,
      blob_thumbmail_id: newImages.blob_thumb_id,
      blob_min_id: newImages.blob_min_id,
      user_id: null,
      item_id: null,
      status: 1
    };
    return await this.unitOfWorkDI.blobRepository.insert({ model: result, withProject: true }) as Blob;

  }

  async uploadImageAndSave({ blob, itemId }: { blob: UploadBlobDTO, itemId: string | null }): Promise<Blob> {
    let getUsersBlob = await this.getBlobs({
      userId: this.userId,
      itemId: itemId
    });
    let newImages = await this.uploadImage({ blob });
    let result: Partial<BlobDBO> = {
      blob_id: newImages.blob_id,
      blob_thumbmail_id: newImages.blob_thumb_id,
      blob_min_id: newImages.blob_min_id,
      user_id: this.userId,
      item_id: itemId == null ? undefined : itemId,
      order: getUsersBlob.length + 1,
      status: 0
    }
    return await this.unitOfWorkDI.blobRepository.insert({ model: result, withProject: true }) as Blob;
  }

  async uploadCategoriesIconAndSave({ blob, category_id }: { blob: UploadBlobDTO, category_id: string }): Promise<void> {
    let categoryBlob = await this.unitOfWorkDI.blobRepository.getBlobsCategory({
      category_id: category_id
    });
    let newImages = await this.uploadImage({ blob });
    let result: Partial<BlobDBO> = {
      id: v4(),
      blob_id: newImages.blob_id,
      blob_thumbmail_id: newImages.blob_id,
      blob_min_id: newImages.blob_id,
      user_id: null,
      item_id: null,
      order: 0,
      status: 1,
      category_id: category_id
    };
    await this.unitOfWorkDI.blobRepository.insert({ model: result, withProject: true });
    await this.unitOfWorkDI.categoryRepository.updateIcon({ category_id: category_id, new_icon_id: result.id as string })

    if (categoryBlob.length > 0) {

      await this.unitOfWorkDI.categoryRepository.updateIcon({ new_icon_id: result.id as string, old_icon_id: categoryBlob.map(item => { return item.getDataValue('id') }) })
      let delItems = categoryBlob.map(item => {
        return this.delete({ model: { id: item.getDataValue('id') }, withProject: true });
      });
      await Promise.all(delItems);
    }
  }

  async uploadProjectImage({ blob }: { blob: UploadBlobDTO & { dest: string } }): Promise<number> {
    let blob_id = this.context.project[blob.dest] as string;
    let newImages = await this.uploadImage({ blob });
    let result: Partial<BlobDBO> = {
      id: v4(),
      blob_id: newImages.blob_id,
      blob_thumbmail_id: newImages.blob_id,
      blob_min_id: newImages.blob_id,
      user_id: null,
      item_id: null,
      order: 0,
      status: 1,
      category_id: null
    };
    this.context.project[blob.dest] = result.id
    await this.unitOfWorkDI.blobRepository.insert({ model: result, withProject: true });
    await this.unitOfWorkDI.projectRepository.update({ model: this.context.project, withProject: false })

    return await this.delete({ model: { id: blob_id }, withProject: true });


  }

  async getBlobsBase64ByGuids({ ids }: { ids: string[] }): Promise<any[]> {
    let result = await this.unitOfWorkDI.blobRepository.getByGuids({ ids });
    return result.map((element: any) => {
      switch (element.type) {
        case "jpg": {
          element.type = "image/jpeg";
          return element;
        }
        case "png": {
          element.type = "image/png";
          return element;
        }
      }
    });
  }


  async getBlobs({ userId, itemId }: { userId: string | null | undefined, itemId: string | null | undefined }): Promise<BlobDBO[]> {
    return await this.toJsonParse(
      this.unitOfWorkDI.blobRepository.getBlobs({
        userId,
        itemId
      })
    ) as BlobDBO[];
  }

  async getUnverified({ }): Promise<BlobDBO[]> {
    return await this.toJsonParse(
      this.unitOfWorkDI.blobRepository.getUnverified({})
    ) as BlobDBO[];
  }
  async verifyImage({ blob }: { blob: BlobDBO }): Promise<[affectedCount: number]> {
    return await this.unitOfWorkDI.blobRepository.verifyImage({
      blob
    })
  }
}


export const BlobServicePlugin = {
  pluginName: "blob-service",
  type: 'service',
  di: 'blobServiceDI',
  classType: BlobService
} 
