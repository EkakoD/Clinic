import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';

// import { MatDividerModule } from '@angular/material/divider';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatCardModule } from '@angular/material/card';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatSelectModule } from '@angular/material/select';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatRippleModule } from '@angular/material/core';
// import {MatTreeModule} from '@angular/material/tree';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';

const modules = [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatTabsModule,
    // MatCheckboxModule,
    // MatCardModule,
    // MatExpansionModule,
    // MatProgressBarModule,
    // MatSelectModule,
    // MatMenuModule,
    // MatProgressSpinnerModule,
    // MatSidenavModule,
    // MatListModule,
    // MatRadioModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatAutocompleteModule,
    // MatBottomSheetModule,
    // MatChipsModule,
    // MatRippleModule,
    // MatTooltipModule,
    // MatBadgeModule,
    // MatToolbarModule,
    // MatSlideToggleModule,
    // MatTreeModule,
    // MatButtonToggleModule
];

@NgModule({
    imports: [modules],
    exports: [modules]
})

export class MaterialModule { }
