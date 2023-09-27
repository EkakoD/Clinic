import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { LoginModel, RegisterClientModel, RegisterDoctorModel, ResetPasswordModel, SendEmailModel } from 'src/app/shared/model/auth/auth.model';
import { environment } from 'src/environments/environment';
import { InfoSnackBarComponent } from '../../component/info-snack-bar/info-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  env = environment;
  usersUrl = this.env.apiUrl + 'Users';

  private _logoutRedirectionUrl: string;
  public authEvent$ = new Subject<boolean>();
  // public externalClient$: BehaviorSubject<RegisterModel>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,) { }

  sendEmail(model: SendEmailModel) {
    return this.http.post<{ success: boolean, message: string, data: string }>(this.usersUrl + "/SendTempCode", model);
  }

  registerClient(model: RegisterClientModel) {
    return this.http.post<{ success: boolean, message: string, data: string }>(this.usersUrl + "/CreateClient", model);
  }

  registerDoctor(model: RegisterDoctorModel) {
    return this.http.post<{ success: boolean, message: string, data: string }>(this.usersUrl + "/CreateDoctor", model);
  }

  resetPassword(model: ResetPasswordModel) {
    return this.http.post<{ success: boolean, message: string, data: string }>(this.usersUrl + "/ResetPassword", model);
  }

  signIn(person: LoginModel) {
    return this.http.post<any>(this.usersUrl + `/Login`, person).pipe(
      tap((loginRes) => {
        console.log(loginRes)
        // save token
        if (!loginRes.error) {
          localStorage.setItem('token', loginRes.data.token);
          localStorage.setItem('id', loginRes.data.id);
          localStorage.setItem('role', loginRes.data.role);
          this.getUserDetails(loginRes.data.id).subscribe(res => console.log(res));
          // const ExpireDate = (new Date().getTime() / 1000) + loginRes.expires_in;
          // localStorage.setItem('expire_date', ExpireDate);
        } else {
          this.logOut();
          this.snackBar.openFromComponent(InfoSnackBarComponent, {
            data: 'არასწორია ელ-ფოსტა ან პაროლი',
            duration: 5 * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar', 'error-snackbar']
          });

        }
      })
    );
    ;
  }

  // get external client details
  getUserDetails(id) {
    let params = new HttpParams()
      .set('Id', id.toString())
    return this.http.get<any>(this.usersUrl + '/GetUserDetails', { params }).pipe(
      tap(client => {

        // save external client info
        console.log(client)
        // this.externalClient$.next(client);
        this.authEvent$.next(true);

      })
    )

  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  logOut() {
    localStorage.clear();
    this.authEvent$.next(false);
    this.router.navigate(['/auth/signin']);

  }
}