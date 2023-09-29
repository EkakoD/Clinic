import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { InfoSnackBarComponent } from 'src/app/core/component/info-snack-bar/info-snack-bar.component';
import { AuthService } from 'src/app/core/service/auth/auth.service'
import { LoginModel, RegisterClientModel, SendEmailModel } from 'src/app/shared/model/auth/auth.model';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {

  registrationForm: FormGroup;

  errMessage: string;
  submitLoadingFlag = false; 
  sendCodeLoadingFlag = false;
  constructor(
    public router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      lastname: new FormControl(null, [Validators.required]),
      personalNumber: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      activateCode: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8),
      Validators.pattern(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]{0,})/)]),
    });
  }
  sendActivateCode() {
    if (this.registrationForm.get('email').valid) {
      const email = this.registrationForm.get('email').value;
      const sendEmailModel: SendEmailModel = {
        email: email
      }
      this.sendCodeLoadingFlag = true;
      this.authService.sendEmail(sendEmailModel).pipe(
        finalize(() => this.sendCodeLoadingFlag = false)
      ).subscribe(res => {
        if (res.success) {
          this.snackbarAdapter('მოქმედება წარმატებით შესრულდა', true);
        } else {
          this.errMessage = res.message;
        }
      });
    }
  }

  isFormValid() {
    if (this.registrationForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  submit() {
    if (this.registrationForm.valid) {
      var model: RegisterClientModel = {
        firstname: this.registrationForm.get('firstname').value,
        lastname: this.registrationForm.get('lastname').value,
        email: this.registrationForm.get('email').value,
        personalNumber: this.registrationForm.get('personalNumber').value,
        activateCode: this.registrationForm.get('activateCode').value,
        password: this.registrationForm.get('password').value,
      }
      this.submitLoadingFlag = true;
      this.authService.registerClient(model).pipe(
        finalize(() => this.submitLoadingFlag = false)
      ).subscribe(res => {
        if (res.success) {
          this.snackbarAdapter('მოქმედება წარმატებით შესრულდა', true);

          const loginModel: LoginModel = {
            email: model.email,
            password: model.password
          }
          this.authService.signIn(model).subscribe(
            res => {
              this.router.navigate(['/home']);
            });
        }
      });
    }

  }

  snackbarAdapter(msg: string, success: boolean) {
    const statusClass = success ? 'success-snackbar' : 'error-snackbar';
    this.snackBar.openFromComponent(InfoSnackBarComponent, {
      data: `<i class="fal fa-info-circle mr-2"></i> ${msg}`,
      duration: 5 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar', statusClass]
    });

  }
}
