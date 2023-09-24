import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BannerComponent } from './page/home/banner/banner.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule
    ],
    exports: [],
    providers: [
        // HomeService,
    ]
})

export class HomeModule { }