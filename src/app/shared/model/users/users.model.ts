export class DoctorsModel {
    constructor(
        public id: number,
        public imageUrl: string,
        public firstname: string,
        public lastname: string,
        public category: string,
        public review: number
    ) { }
}

export class UserDetailsModel {
    constructor(
        public id: number,
        public imageUrl: string,
        public firstname: string,
        public lastname: string,
        public personalNumber: string,
        public email: string,
        public categoryId: number,
        public categoryName: string,
        public roleId: number,
        public roleName: string,
        public review: number,
        public appointmentCount: number
    ) { }
}

