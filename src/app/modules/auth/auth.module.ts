import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterClientComponent } from './page/register-client/register-client.component';
import { RegisterDoctorComponent } from './page/register-doctor/register-doctor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { CategoriesService } from 'src/app/core/service/categories/categories.service';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
    declarations: [
        RegisterDoctorComponent,
        RegisterClientComponent,
        // ResetPasswordModalComponent,
        // LoginModalComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ],
    exports: [],
    providers: [
        AuthService,
        CategoriesService
    ]
})

export class AuthModule { }