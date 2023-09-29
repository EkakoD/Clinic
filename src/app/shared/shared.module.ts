import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { CategoriesComponent } from './component/categories/categories.component';
import { TimeTableComponent } from './component/time-table/time-table.component';
import { AppointmentPositionDirective } from './directives/appointment-position.directive';
import { MakeAppointmentModalComponent } from './component/time-table/make-appointment-modal/make-appointment-modal.component';
import { PageLoaderComponent } from './component/page-loader/page-loader.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
    ],
    declarations: [
        CategoriesComponent,
        TimeTableComponent,
        AppointmentPositionDirective,
        MakeAppointmentModalComponent,
        PageLoaderComponent
    ],
    entryComponents: [],
    providers: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        CategoriesComponent,
        TimeTableComponent,
        AppointmentPositionDirective,
        PageLoaderComponent
    ]
})

export class SharedModule { }
