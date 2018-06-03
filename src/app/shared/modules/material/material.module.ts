import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Angular material components
 */

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule
  ],
  declarations: [],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule
  ]
})
export class MaterialModule {
}
