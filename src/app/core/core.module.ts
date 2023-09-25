import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

// // services
import { ErrorInterceptorService } from './interceptor/error.interceptor';
import { TokenInterceptorService } from './interceptor/token.interceptor';

// // components
import { DialogComponent } from './component/dialog/dialog.component';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';

@NgModule({
    declarations: [
        DialogComponent
    ],
    imports: [
        HttpClientModule,
        SharedModule
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
    ],
    exports: [
    ],
    entryComponents: [
        DialogComponent
    ]
})

export class CoreModule { }
