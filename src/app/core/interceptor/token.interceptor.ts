import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

    constructor(
        @Inject(LOCAL_STORAGE) private webStorage: WebStorageService,
    ) { }

    intercept(req:any, next:any) {

        // get service
        if (this.webStorage.get('token')) {

            const tokenizedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.webStorage.get('token')}`,
                }
            });

            return next.handle(tokenizedReq);

        } else {

            return next.handle(req);

        }


    }

}
