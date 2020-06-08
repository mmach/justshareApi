

async function checkIfUserHaveAccessToRemoveBlob() {
    let blob = await this.blobServiceDI.setContext(this.context).getById({ id: this.model.id })
    if (blob == null) {
        return false;
    }
    if (blob.user_id == this.context.user.id || this.context.is_admin==true || this.context.user.is_root==true) {
        return true;
    } else {
        return false
    }
}

let BlobPrivileges = {
    checkIfUserHaveAccessToRemoveBlob
}
export default BlobPrivileges