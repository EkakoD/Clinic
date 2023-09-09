import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        // SharedModule,
        HomeRoutingModule
    ],
    exports: [],
    providers: [
        // HomeService,
    ]
})

export class HomeModule {}