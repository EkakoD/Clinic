import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { InfoSnackBarComponent } from 'src/app/core/component/info-snack-bar/info-snack-bar.component';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { CategoriesService } from 'src/app/core/service/categories/categories.service';
import { RegisterDoctorModel, UploadFileModel } from 'src/app/shared/model/auth/auth.model';
import { CategoriesModel } from 'src/app/shared/model/categories/catgeories.model';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {
  doctorRegistrationForm: FormGroup;
  cvName = null;
  cvBase64textString: string
  imgName = null;
  imgBase64textString: string;

  image: UploadFileModel;
  cv: UploadFileModel;
  catgeories: CategoriesModel[];
  errMessage: string;
  submitLoadingFlag = false; // Todo ლოუდერებისთვის
  selectedFileName: string = '';
  constructor(
    public router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private categoriesService: CategoriesService

  ) { }

  ngOnInit() {
    this.doctorRegistrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      lastname: new FormControl(null, [Validators.required]),
      personalNumber: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8),
      Validators.pattern(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]{0,})/)]),
      categoryId: new FormControl(null, [Validators.required])
    });
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(res => {
      this.catgeories = res.data;
    })
  }
  isFormValid() {
    if (this.doctorRegistrationForm.valid) {
      return false;
    } else {
      return true;
    }
  }
  handleUploadCv(event) {
    if (event.target.files[0]) {
      this.cvName = event.target.files[0].name;
    }

    const reader = new FileReader();
    let fileList: FileList = event.target.files;
    var file = fileList[0];
    reader.onload = this.handleReaderLoadedCv.bind(this);
    reader.readAsArrayBuffer(file)
  }

  handleReaderLoadedCv(readerEvt) {
    var binaryString = readerEvt.target.result;
    let TYPED_ARRAY = new Uint8Array(binaryString);

    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');

    this.cvBase64textString = btoa(STRING_CHAR);
  }

  handleUploadImg(event) {
    if (event.target.files[0]) {
      this.imgName = event.target.files[0].name;
    }

    const reader = new FileReader();
    let fileList: FileList = event.target.files;
    var file = fileList[0];
    reader.onload = this.handleReaderLoadedImg.bind(this);
    reader.readAsArrayBuffer(file)
  }

  handleReaderLoadedImg(readerEvt) {
    var binaryString = readerEvt.target.result;
    let TYPED_ARRAY = new Uint8Array(binaryString);

    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');

    this.imgBase64textString = btoa(STRING_CHAR);
  }

  submit() {
    if (this.imgBase64textString) {
      this.image = {
        name: this.imgName ?? null,
        data: this.imgBase64textString,
      }
    }
    if (this.cvBase64textString) {
      this.cv = {
        name: this.cvName,
        data: this.cvBase64textString,
      }
    }

    if (this.doctorRegistrationForm.valid) {
      var model: RegisterDoctorModel = {
        firstname: this.doctorRegistrationForm.get('firstname').value,
        lastname: this.doctorRegistrationForm.get('lastname').value,
        email: this.doctorRegistrationForm.get('email').value,
        personalNumber: this.doctorRegistrationForm.get('personalNumber').value,
        password: this.doctorRegistrationForm.get('password').value,
        categoryId: this.doctorRegistrationForm.get('categoryId').value,
        pdf: this.cv ?? null,
        image: this.image ?? null
      }
      this.submitLoadingFlag = true;
      this.authService.registerDoctor(model).pipe(
        finalize(() => this.submitLoadingFlag = false)
      ).subscribe(res => {
        console.log(res);
        if (res.success) {
          //Todo: რომ დარეგისტრირდება უნდა შელოგინდეს თან და გადავიდეს ჰოუმზე
          this.snackbarAdapter('მოქმედება წარმატებით შესრულდა', true);
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

