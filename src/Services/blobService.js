import BaseService from "../Architecture/baseService.js";
import BlobRepository from "../Repository/blobRepository.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";
import Jimp from "jimp";

let upload_path = process.env.UPLOAD_PATH || CONFIG.UPLOAD_PATH
let saveBlobToFile = async ({ blob }) => {
  let newUid = uuidv4();
  switch (blob.type) {
    case "image/jpeg": {
      let fd = await fs.open(`${upload_path}/${newUid}.jpg`, "w+");
      let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
      await fs.close(fd);

      return {
        path: `${upload_path}/${newUid}.jpg`,
        id: newUid,
        filename: `${newUid}.jpg`
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
        filename: `${newUid}.png`
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
      let imgNormal = await Jimp.read(newBlob.path);
      await imgNormal
        .contain(300, 300) // resize
        .quality(60) // set JPEG quality
        .writeAsync(`${upload_path}/${newBlob.id}-thumb.png`); // save

      await imgNormal
        .contain(100, 100) // resize
        .quality(60) // set JPEG quality
        .writeAsync(`${upload_path}/${newBlob.id}-min.png`); // save
      let blob_id = await this.insertFile({
        id: blob.id,
        path: newBlob.path,
        fileName: newBlob.filename
      });
      let uid_min = uuidv4()
      let blob_min_id = await this.insertFile({
        id: uid_min,
        path: `${upload_path}/${newBlob.id}-min.png`,
        fileName: `${newBlob.id}-min.png`
      });
      let uid_thumb = uuidv4()
      let blob_thumb_id = await this.insertFile({
        id: uid_thumb,
        path: `${upload_path}/${newBlob.id}-thumb.png`,
        fileName: `${newBlob.id}-thumb.png`
      });
      return {
        blob_id: blob_id,
        blob_min_id: blob_min_id,
        blob_thumb_id: blob_thumb_id
      };
      ///write to db
    } catch (exception) {
      console.log(exception.parent.message);
      throw exception.parent.message
    } finally {
      await fs.unlink(`${newBlob.path}`);
      await fs.unlink(`${upload_path}/${newBlob.id}-min.png`);
      await fs.unlink(`${upload_path}/${newBlob.id}-thumb.png`);

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

  async uploadImageAndSave({ blob, itemId }) {
    let getUsersBlob = await this.getBlobs({
      userId: this.userId,
      itemId: itemId
    });

    /*  if (getUsersBlob.length > 0) {
        let delItems = getUsersBlob.map(async item => {
          await this.delete({ model: item });
        });
        await Promise.all(delItems);
      }*/

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
    return await this.unitOfWorkDI.blobRepository.insert({ model: result });
  }

  async uploadCategoriesIconAndSave({ blob, category_id }) {
    let categoryBlob = await this.unitOfWorkDI.blobRepository.getBlobsCategory({

      category_id: category_id
    });
    console.log(categoryBlob);
    let newImages = await this.uploadIcon({ blob });
    let result = {
      id: uuidv4(),
      blob_id: newImages.blob_id,
      blob_thumbmail_id: newImages.blob_id,
      blob_min_id: newImages.blob_id,
      user_id: null,
      item_id: null,
      order: 0,
      status: 1,
      category_id: category_id
    };
    await this.unitOfWorkDI.blobRepository.insert({ model: result });
    await this.unitOfWorkDI.categoryRepository.updateIcon({ category_id: category_id, new_icon_id: result.id })

    if (categoryBlob.length > 0) {

      await this.unitOfWorkDI.categoryRepository.updateIcon({ new_icon_id: result.id, old_icon_id: categoryBlob.map(item => { return item.id }) })
      let delItems = categoryBlob.map(item => {
        return this.delete({ model: item });
      });
      await Promise.all(delItems);
    }


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

  async getUnverified({ pagination }) {
    return await this.toJsonParse(
      this.unitOfWorkDI.blobRepository.getUnverified({
        pagination
      })
    );
  }
  async verifyImage({ blob }) {
    return await this.unitOfWorkDI.blobRepository.verifyImage({
      blob
    })

  }

}
