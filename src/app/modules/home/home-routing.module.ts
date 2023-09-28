import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { HomeComponent } from './page/home/home.component';
import { DoctorComponent } from './page/doctor/doctor.component';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: 'doctor/:id',
        // canActivate: [AuthGuard],
        component: DoctorComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
