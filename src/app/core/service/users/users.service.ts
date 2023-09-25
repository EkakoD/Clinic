import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DoctorsModel } from 'src/app/shared/model/users/users.model';

@Injectable()

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
}
