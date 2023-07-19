import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFromDialogComponent } from './components/user-from-dialog/user-from-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  {
    id:1,
    name: 'Vicente',
    surname: 'Carreras',
    email: 'vicentecs@gmail.com',
    password: 'jejejejijiji'
  },
  {
    id:2,
    name: 'Alejandra',
    surname: 'Simois',
    email: 'alejandrasimua@gmail.com',
    password: 'jojojojujuju'
  }
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  public users: User[]= ELEMENT_DATA;

  constructor(private matDialog: MatDialog){}

  onCreateUser(): void{
    const dialogRef = this.matDialog.open(UserFromDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v)=>{
        if (v) {
          this.users=[
            ...this.users,
            {
              id: this.users.length + 1,
              name: v.name,
              surname: v.surname,
              email: v.email,
              password: v.password
            },
          ];
        }else{
        }
        }
    });
  }

  onDeleteUser(userToDelete:User):void{
    if (confirm(`¿Esta seguro de querer eliminar a ${userToDelete.name}?`)) {
      this.users = this.users.filter((u) => u.id !== userToDelete.id);
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
          this.users=this.users.map((user)=>{
            return user.id === userToEdit.id ?{...user, ...userUpdated} : user;
          })
        }
        }
    })
  }
}
