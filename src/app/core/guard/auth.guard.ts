import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    canActivate(): boolean {

        if (!this.authService.isLoggedIn()) {

            this.authService.logOut();
            this.router.navigate(['/home']);

            return false;

        }

        return true;

    }

}