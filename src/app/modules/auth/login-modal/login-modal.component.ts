import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordModalComponent } from '../reset-password-modal/reset-password-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModel } from 'src/app/shared/model/auth/auth.model';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { finalize } from 'rxjs';
import { InfoSnackBarComponent } from 'src/app/core/component/info-snack-bar/info-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  loginForm: FormGroup;
  submitLoadingFlag = false;
  constructor(
    private dialog: MatDialog,
    public dialogLoginRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])

    });
  }
  resetPassword() {
    this.dialogLoginRef.close();
    const dialogRef = this.dialog.open(ResetPasswordModalComponent, {
      panelClass: ['container'],
      maxWidth: '700px',
      maxHeight: '90vh',
      disableClose: false,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => {
      const dialogLoginRef = this.dialog.open(LoginModalComponent, {
        panelClass: ['container'],
        maxWidth: '700px',
        maxHeight: '90vh',
        disableClose: false,
        autoFocus: false
      })
    });
  }

  isFormValid() {
    if (this.loginForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  submit() {
    const model: LoginModel = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.submitLoadingFlag = true;
    this.authService.signIn(model).pipe(
      finalize(() => this.submitLoadingFlag = false)
    ).subscribe(
      res => {
        this.snackbarAdapter('მოქმედება წარმატებით შესრულდა', true);
        this.dialogLoginRef.close();
        this.authService.authEvent$.next(true);
      });
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
