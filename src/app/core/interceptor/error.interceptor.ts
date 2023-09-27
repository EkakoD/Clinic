import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoSnackBarComponent } from '../component/info-snack-bar/info-snack-bar.component';

@Injectable({
    providedIn: 'root'
})

export class ErrorInterceptorService implements HttpInterceptor {

    constructor(
        public authService: AuthService,
        public router: Router,
        private snackBar: MatSnackBar,
    ) { }

    handleError = (error: HttpErrorResponse) => {
        const err = error;

        if (err.status === 401) {

            // logout
            this.authService.logOut(); 

        } else if (err.status === 403 || err.status === 405) {

            // forbidden
            this.snackBar.openFromComponent(InfoSnackBarComponent, {
                data: 'არ გაქვთ წვდომა',
                duration: 5 * 1000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snackbar', 'error-snackbar']
            });

            this.router.navigate(['/home']);

        } else if (err.status === 404) {

            // not found
            this.snackBar.openFromComponent(InfoSnackBarComponent, {
                data: 'მონაცემები არ მოიძებნა',
                duration: 5 * 1000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snackbar', 'error-snackbar']
            });

        } else if (err.status === 400) {

            // bad request
            let errMSG: string;

            if (typeof err.error === 'object') {

                errMSG = '';

                let size = 0;

                for (const key in err.error) {
                    if (err.error.hasOwnProperty(key)) { size++; }
                }

                Object.entries(err.error).forEach(([key, value], index) => {
                    errMSG += index === size - 1 ? value : value + '<br>';
                });

            } else if (typeof err.error === 'string') {

                errMSG = err.error;

            } else {

                errMSG = 'დაფიქსირდა გაუთვალისწინებელი შეცდომა';

            }

            this.snackBar.openFromComponent(InfoSnackBarComponent, {
                data: errMSG,
                duration: 5 * 1000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snackbar', 'error-snackbar']
            });

        } else {

            const errMSG = err.error && typeof (err.error) === 'string' ? err.error : 'დაფიქსირდა გაუთვალისწინებელი შეცდომა';

            this.snackBar.openFromComponent(InfoSnackBarComponent, {
                data: errMSG,
                duration: 5 * 1000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snackbar', 'error-snackbar']
            });

        }

        return throwError(error);

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const appReq = req.clone({});

        // handle errors
        return next.handle(appReq).pipe(
            catchError(this.handleError)
        );

    }

}
