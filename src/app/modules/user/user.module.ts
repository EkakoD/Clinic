import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersService } from 'src/app/core/service/users/users.service';
import { UserRoutingModule } from './user-routing.module';
import { DetailsComponent } from './page/details/details.component';
import { MainInfoComponent } from './page/details/main-info/main-info.component';

@NgModule({
    declarations: [
        DetailsComponent,
        MainInfoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UserRoutingModule
    ],
    exports: [],
    providers: [
        UsersService
    ]
})

export class UserModule { }