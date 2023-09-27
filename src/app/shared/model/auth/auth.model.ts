export class SendEmailModel {
    constructor(
        public email: string
    ) { }
}

export class RegisterClientModel {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public personalNumber: string,
        public activateCode: string,
        public password: string
    ) { }
}
export class UploadFileModel {
    constructor(
        public name: string,
        public data: string,
        // public contentType: string
    ) { }
}

export class RegisterDoctorModel {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public personalNumber: string,
        public password: string,
        public categoryId: number,
        public image: UploadFileModel,
        public pdf: UploadFileModel
    ) { }
}

export class LoginModel {
    constructor(
        public email: string,
        public password: string
    ) { }
}
export class ResetPasswordModel {
    constructor(
        public email: string
    ) { }
}