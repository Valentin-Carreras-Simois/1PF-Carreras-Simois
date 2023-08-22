import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFromDialogComponent } from './components/user-from-dialog/user-from-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  public users: Observable<User[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private userService: UserService ,
    private notifier: NotifierService,
    ){
      this.userService.loadUsers();
      this.isLoading$ = this.userService.isLoading$;
      this.users = this.userService.getUsers().pipe(
        map((valor) => 
          valor.map((usuario) => ({
            ...usuario,
            name: usuario.name.toUpperCase(),
            surname:usuario.surname.toUpperCase(),
          }))
        )
      );
      
    }

  onCreateUser(): void{
    const dialogRef = this.matDialog.open(UserFromDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v)=>{
        if (v) {
        this.notifier.showSuccess('Se cargo el usuario correctamente');
        this.userService.createUser({
              name: v.name,
              surname: v.surname,
              email: v.email,
              password: v.password,
              role: v.role,
        });  
        }else{

        }
        }
    });
  }

  onDeleteUser(userToDelete:User):void{
    if (confirm(`¿Esta seguro de querer eliminar a ${userToDelete.name}?`)) {
      this.userService.deleteUserById(userToDelete.id);
      this.notifier.showSuccess('Usuario eliminado');
    }
  }

  onEditUser(userToEdit:User):void{
    this.matDialog.open(UserFromDialogComponent,
      {
        data:userToEdit
      })
    .afterClosed()
    .subscribe({
      next: (userUpdated)=>{
        if (userUpdated) {
          this.userService.updateUserById(userToEdit.id, userUpdated);
          this.notifier.showInfo('Se actualizo la informacion correctamente');
        }
        }
    })
  }
}
