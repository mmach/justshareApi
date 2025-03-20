import { ValidationException } from './../Architecture/Exceptions/validationExceptions.js'



async function checkIfMailExistInDb() {
    let validationResult = await this.userServiceDI.setContext(this.context).checkMailInDb({
        email: this.model.email,
        withoutAuth: true
    })
    if (validationResult) {
        let exception = new ValidationException();
        exception.throw({ field: "email", code: "EMAIL_EXIST_IN_DB" }, [
            this.model.email
        ]);
    }
}

export const UserValidators = {
    checkIfMailExistInDb
}
