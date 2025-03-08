import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonComponent } from './components/common-component/common-component.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AlertComponent } from './components/alert/alert.component';
import { TooltipDirective } from './directive/tooltip.directive';
import { TooltipDialogComponent } from './components/tooltip-dialog/tooltip-dialog.component';
import { RangePipe } from './pipe/range';

@NgModule({
  declarations: [
    NavbarComponent,
    CommonComponent,
    DialogComponent,
    AlertComponent,
    TooltipDirective,
    TooltipDialogComponent,
    RangePipe
  ],
  imports: [
    RouterModule,

    /* Angular Material Modules */
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCheckboxModule,
    DragDropModule
  ],
  exports: [
    NavbarComponent,
    CommonComponent,
    DialogComponent,
    AlertComponent,
    TooltipDialogComponent,
    TooltipDirective,
    RangePipe
  ],
})
export class CoreModule { }
