import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NoAuthGuard } from './core/guard/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'home',
        // canActivate:[AuthGuard],
        loadChildren: () =>
          import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'register',
        // canActivate: [NoAuthGuard],
        loadChildren: () =>
          import('./modules/auth/auth.module').then(m => m.AuthModule)
      },

    ]
  },

  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
