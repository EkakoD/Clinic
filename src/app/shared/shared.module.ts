import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { CategoriesComponent } from './component/categories/categories.component';
import { TimeTableComponent } from './component/time-table/time-table.component';
import { AppointmentPositionDirective } from './directives/appointment-position.directive';
export function culture() {
    const locale = localStorage.getItem('culture');
    return locale ? locale.substr(0, locale.indexOf('-')) : 'ka';
}

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
        AppointmentPositionDirective
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
        AppointmentPositionDirective
    ]
})

export class SharedModule { }
