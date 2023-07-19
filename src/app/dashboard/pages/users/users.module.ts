import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFromDialogComponent } from './components/user-from-dialog/user-from-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserFromDialogComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UsersComponent,
  ]
})
export class UsersModule { }
