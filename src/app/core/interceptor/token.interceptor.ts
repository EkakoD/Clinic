import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

    constructor(
    ) { }

    intercept(req: any, next: any) {

        // get service
        if (localStorage.getItem('token')) {

            const tokenizedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            return next.handle(tokenizedReq);

        } else {

            return next.handle(req);

        }


    }

}
