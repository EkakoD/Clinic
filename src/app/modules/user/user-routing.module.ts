import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { DetailsComponent } from './page/details/details.component';
// import { AuthGuard } from 'src/app/core/guard/auth.guard';

export const routes: Routes = [
    {
        path: 'details/:id',
        canActivate: [AuthGuard],
        component: DetailsComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }
