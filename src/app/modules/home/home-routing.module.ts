import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuard],
        component: HomeComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
