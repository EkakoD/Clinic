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