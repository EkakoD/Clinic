import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentModel, AppointmentTimesModel, CreateAppointmentModel } from 'src/app/shared/model/appointment/appointment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  env = environment;
  appointmentsUrl = this.env.apiUrl + 'Appointments';
  constructor(private http: HttpClient) { }
  getAppointmentForCalendar(start: string, end: string, clientId?: number, doctorId?: number) {
    let params = new HttpParams()
      .set('StartDate', start.toString())
      .set('EndDate', end.toString())
      .set('PatientId', clientId ? clientId.toString() : '')
      .set('DoctorId', doctorId ? doctorId.toString() : '')
    return this.http.get<{ success: boolean, message: string, data: AppointmentModel[] }>(this.appointmentsUrl + "/GetAppointments", { params });
  }

  getAppointmentTimes() {
    return this.http.get<{ success: boolean, message: string, data: AppointmentTimesModel[] }>(this.appointmentsUrl + "/GetAppointmentTimes");

  }

  createAppointment(model: CreateAppointmentModel) {
    return this.http.post<{ success: boolean, message: string, data: string }>(this.appointmentsUrl + "/CreateAppointment", model);
  }

  deleteAppointment(id: number) {
    let params = new HttpParams()
      .set('Id', id.toString())
    return this.http.delete<{ success: boolean, message: string, data: string }>(this.appointmentsUrl + "/DeleteAppointment", { params });

  }
}
