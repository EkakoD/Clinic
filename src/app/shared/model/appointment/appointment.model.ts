export class AppointmentTimesModel {
    constructor(
        public id: number,
        public time: string
    ) { }
}

export class AppointmentModel {
    constructor(
        public id: number,
        public appointmentTime: string,
        public doctorId: number,
        public patientId: number,
        public timeId: number,
        public date: string
    ) { }
}

export class CreateAppointmentModel {
    constructor(
        public patientId: number,
        public doctorId: number,
        public timeId: number,
        public date: string,
        public comment: string
    ) { }
}
