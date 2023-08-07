import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFromDialogComponent } from './components/user-from-dialog/user-from-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserFromDialogComponent,
    UsersTableComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersRoutingModule
  ],
  exports: [
    UsersComponent
  ],
})
export class UsersModule { }
