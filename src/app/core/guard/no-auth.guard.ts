import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthUtilitiesService } from '../service/auth/auth-utilities.service';
import { AuthService } from '../service/auth/auth.service';

@Injectable()

export class NoAuthGuard implements CanActivate {

  constructor(
    private authUtilitiesService: AuthUtilitiesService,
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {

    if ( true
        // this.authService.isLoggedIn() ToDo
        ) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;

  }

}
