import CONFIG from '../config.js';
import { ValidationException } from './../Architecture/Exceptions/validationExceptions.js';

async function getSizeOfUplodedFile(blob) {
    if (blob.getSize(blob) > 10000) {
        new ValidationException().throw({
            code: "FILE_IS_TOO_BIG",
            field: "type"
        });
    }
}

async function checkUploadedFileType(blob) {
    if (!CONFIG.UPLOADED_TYPE.includes(blob.type)) {
        new ValidationException().throw({
            code: "UNRECOGNIZE_FILE_TYPE",
            field: "type"
        });
    }
}

async function countOfUsersImages() {
    let result = await this.blobServiceDI.setContext(this.context).getBlobs({ userId: this.context.user.id, itemId: null })
    if (result.length > 4) {
        new ValidationException().throw({
            code: "TOO_MANY_USER_IMAGES",
            field: "blob"
        });
    }
}

export const BlobValidators = {
    countOfUsersImages,
    checkUploadedFileType,
    getSizeOfUplodedFile
}
