import { AuthService } from 'src/app/core/service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordModel } from 'src/app/shared/model/auth/auth.model';
import { finalize } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoSnackBarComponent } from 'src/app/core/component/info-snack-bar/info-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitLoadingFlag = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ResetPasswordModalComponent>,
  ) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  isFormValid() {
    if (this.resetPasswordForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  submit() {
    const model: ResetPasswordModel = {
      email: this.resetPasswordForm.get('email').value,
    }
    this.submitLoadingFlag = true;
    this.authService.resetPassword(model).pipe(
      finalize(() => this.submitLoadingFlag = false)
    ).subscribe(
      res => {
        this.snackbarAdapter('მოქმედება წარმატებით შესრულდა', true);
        this.dialogRef.close();
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

