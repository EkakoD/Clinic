import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BannerComponent } from './page/home/banner/banner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesService } from 'src/app/core/service/categories/categories.service';
import { DoctorCardComponent } from './page/home/doctor-card/doctor-card.component';
import { UsersService } from 'src/app/core/service/users/users.service';
import { DoctorComponent } from './page/doctor/doctor.component';
import { DoctorInfoComponent } from './page/doctor/doctor-info/doctor-info.component';

@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent,
        DoctorCardComponent,
        DoctorComponent,
        DoctorInfoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule
    ],
    exports: [],
    providers: [
        CategoriesService,
        UsersService
    ]
})

export class HomeModule { }