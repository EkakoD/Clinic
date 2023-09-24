import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
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
    ]
})

export class SharedModule { }
