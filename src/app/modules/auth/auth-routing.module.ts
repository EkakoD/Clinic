import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterDoctorComponent } from './page/register-doctor/register-doctor.component';
import { RegisterClientComponent } from './page/register-client/register-client.component';
// import { AuthGuard } from 'src/app/core/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'doctor',
                component: RegisterDoctorComponent
            },
            {
                path: 'client',
                component: RegisterClientComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
