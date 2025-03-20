import fs from "fs-extra";
import Jimp from "jimp";
import {v4} from "uuid";
import {BaseService} from "../../Architecture/Base/baseService";
import {ServerException} from "../../Architecture/Exceptions/serverException.js";
import CONFIG from "../../config.js";
import BlobRepository from "../../Repository/blobRepository.js";

let upload_path = process.env.UPLOAD_PATH || CONFIG.UPLOAD_PATH
let saveBlobToFile = async ({ blob }) => {
  let newUid = v4();
  if (blob.blob.indexOf("base64,") > 0) {
    blob.blob = blob.blob.split("base64,")[1];
  }
  switch (blob.type) {
    case "image/jpeg": {
      let fd = await fs.open(`${upload_path}/${newUid}.jpg`, "w+");
      let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
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
      let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
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
      let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
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
      let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
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
      let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
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

/**
 *
 * @export
 * @class BlobService
 * @extends BaseService
 */
export default class BlobService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, blobRepositoryDI:BlobRepository}}
   */
  constructor({ unitOfWorkDI, blobRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'blobRepository' });
  }

  async getProjectsStorage({ model }) {
    switch (model.type) {
      case 'ITEMS': return await this.unitOfWorkDI.blobRepository.getProjectsItemsStorage({ model })
      case 'PROJECT': return await this.unitOfWorkDI.blobRepository.getProjectsStorage({ model })
      case 'USERS': return await this.unitOfWorkDI.blobRepository.getProjectsUsersStorage({ model })
      case 'CATEGORIES': return await this.unitOfWorkDI.blobRepository.getProjectsCategoriesStorage({ model })

    }
  }
  /**
   * Save blob to file , create thumbmail save into database
   *
   * @param {*} { blob }
   * @returns
   * @memberof BlobService
   */
  async uploadImage({ blob }) {
    let newBlob = {};
    try {
      newBlob = await saveBlobToFile.bind(this)({ blob });
      if (newBlob.type != 'svg' && newBlob.type != 'webp' && newBlob.type != 'pdf') {
        let imgNormal = await Jimp.read(newBlob.path);

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
        path: newBlob.path,
        fileName: newBlob.filename
      });
      if (newBlob.type != 'svg' && newBlob.type != 'webp' && newBlob.type != 'pdf') {
        let uid_min = v4()
        let blob_min_id = await this.insertFile({
          id: uid_min,
          path: `${upload_path}/${newBlob.id}-min.` + newBlob.type,
          fileName: `${newBlob.id}-min.` + newBlob.type
        });
        let uid_thumb = v4()
        let blob_thumb_id = await this.insertFile({
          id: uid_thumb,
          path: `${upload_path}/${newBlob.id}-thumb.` + newBlob.type,
          fileName: `${newBlob.id}-thumb.` + newBlob.type
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
    } catch (exception) {
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

  async uploadIcon({ blob }) {
    let newBlob = {};
    try {
      newBlob = await saveBlobToFile.bind(this)({ blob });
      let imgNormal = await Jimp.read(newBlob.path);

      await imgNormal
        .contain(50, 50) // resize
        .quality(60) // set JPEG quality
        .writeAsync(`${upload_path}/${newBlob.id}-icon.png`); // save
      let blob_id = await this.insertFile({
        id: blob.id,
        path: newBlob.path,
        fileName: newBlob.filename
      });


      return {
        blob_id: blob_id

      };
      ///write to db
    } catch (exception) {
      console.log(exception.parent.message);
      throw exception.parent.message
    } finally {
      console.log(newBlob.path)

      await fs.unlink(`${newBlob.path}`);

    }
  }



  /**
   *save  file in database
   *
   * @param {*} { uid, path, fileName }
   * @returns
   * @memberof BlobService
   */
  async insertFile({ id, path, fileName }) {
    let result = await this.unitOfWorkDI.blobRepository.insertFile({
      id: id,
      path: path,
      name: fileName
    });
    return result[0].id;
  }

  /**
   *Uplod user image profile , only one per user
   *
   * @param {*} { blob, userId }
   * @memberof BlobService
   */
  async uploadUserImage({ blob }) {
    return await this.uploadImageAndSave({ blob, itemId: null })

  }

  async uploadUserProject({ blob }) {
    let newImages = await this.uploadImage({ blob });
    let result = {
      blob_id: newImages.blob_id,
      blob_thumbmail_id: newImages.blob_thumb_id,
      blob_min_id: newImages.blob_min_id,
      user_id: null,
      item_id: null,
      order: null,
      status: 1
    };
    return await this.unitOfWorkDI.blobRepository.insert({ model: result, withProject: true });

  }

  async uploadImageAndSave({ blob, itemId }) {
    let getUsersBlob = await this.getBlobs({
      userId: this.userId,
      itemId: itemId
    });
    let newImages = await this.uploadImage({ blob });
    let result = {
      blob_id: newImages.blob_id,
      blob_thumbmail_id: newImages.blob_thumb_id,
      blob_min_id: newImages.blob_min_id,
      user_id: this.userId,
      item_id: itemId == null ? undefined : itemId,
      order: getUsersBlob.length + 1,
      status: 0
    };
    return await this.unitOfWorkDI.blobRepository.insert({ model: result, withProject: true });
  }

  async uploadCategoriesIconAndSave({ blob, category_id }) {
    let categoryBlob = await this.unitOfWorkDI.blobRepository.getBlobsCategory({

      category_id: category_id
    });
    let newImages = await this.uploadImage({ blob });
    let result = {
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
    await this.unitOfWorkDI.categoryRepository.updateIcon({ category_id: category_id, new_icon_id: result.id })

    if (categoryBlob.length > 0) {

      await this.unitOfWorkDI.categoryRepository.updateIcon({ new_icon_id: result.id, old_icon_id: categoryBlob.map(item => { return item.id }) })
      let delItems = categoryBlob.map(item => {
        return this.delete({ model: item, withProject: true });
      });
      await Promise.all(delItems);
    }


  }

  async uploadProjectImage({ blob }) {
    let blob_id = this.context.project[blob.dest];
    let newImages = await this.uploadImage({ blob });
    let result = {
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



  /**
   *Get users stream
   *
   * @param {*} { uid }
   * @returns
   * @memberof BlobService
   */
  async getBlobsBase64ByGuids({ ids }) {
    let result = await this.unitOfWorkDI.blobRepository.getByGuids({ ids });
    return result.map(element => {
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

  /**
   *Get blobs from user or item with uid
   *
   * @param {*} { userId, itemId }
   * @returns
   * @memberof BlobService
   */
  async getBlobs({ userId, itemId }) {
    return await this.toJsonParse(
      this.unitOfWorkDI.blobRepository.getBlobs({
        userId,
        itemId
      })
    );
  }

  async getUnverified({  }) {
    return await this.toJsonParse(
      this.unitOfWorkDI.blobRepository.getUnverified({})
    );
  }
  async verifyImage({ blob }) {
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
