import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthUtilitiesService } from '../service/auth/auth-utilities.service';
import { AuthService } from '../service/auth/auth.service';
// import { AuthQueryService } from '../service/auth/auth-query.service';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(
        private authUtilitiesService: AuthUtilitiesService,
        private authService: AuthService,
        private route: ActivatedRoute,

        private router: Router
    ) { }

    canActivate(): boolean {
        if (true
            // !this.authService.isLoggedIn() ToDo
        ) {

            // this.authUtilitiesService.logout(); ToDo
            this.router.navigate(['/auth/login']);

            return false;

        }
        return true
    }

}