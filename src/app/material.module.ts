import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule, MatSnackBarModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule,MatSelectModule} from '@angular/material';


@NgModule({
  imports: [MatButtonModule,MatSnackBarModule, MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule,MatIconModule,MatSelectModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatSelectModule,MatSnackBarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule]
})


export class MaterialModule{}