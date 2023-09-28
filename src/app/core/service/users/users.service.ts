import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DoctorsModel, UserDetailsModel } from 'src/app/shared/model/users/users.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  env = environment;
  usersUrl = this.env.apiUrl + 'Users';

  constructor(private http: HttpClient) { }

  getDoctors(categoryId?: number) {
    let params = new HttpParams()

    if (categoryId != undefined) {
      params.set('CategoryId', categoryId.toString())
    }
    return this.http.get<{ success: boolean, message: string, data: DoctorsModel[] }>(this.usersUrl + "/GetDoctors", { params });
  }

  getUserDetails(id: number) {
    let params = new HttpParams()
      .set('Id', id.toString())
    return this.http.get<{ success: boolean, message: string, data: UserDetailsModel }>(this.usersUrl + '/GetUserDetails', { params });
  }
}
