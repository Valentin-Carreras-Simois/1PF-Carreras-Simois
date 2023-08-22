import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noHotmailValidator } from 'src/app/shared/utils/form-validators';
import { User } from '../../models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-from-dialog.component.html',
  styleUrls: ['./user-from-dialog.component.scss']
})
export class UserFromDialogComponent {
  editingUser?:User;
  nameControl= new FormControl<string | null>(null,[Validators.required, Validators.minLength(3)]);
  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required, noHotmailValidator()]);
  passwordControl = new FormControl<string | null>(null, [Validators.required]);
  roleControl = new FormControl<string | null>(null, [Validators.required]);


  userForm= new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    role: this.roleControl,
  });

  constructor(
    private dialogRef: MatDialogRef<UserFromDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User,
    ){
      if (this.data) {
        this.editingUser = this.data;
        this.nameControl.setValue(this.data.name),
        this.surnameControl.setValue(this.data.surname),
        this.emailControl.setValue(this.data.email),
        this.passwordControl.setValue(this.data.password)
        this.roleControl.setValue(this.data.role)
      }
    }

  onSubmit():void{
    
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      const payload: any = {
        ...this.userForm.value
      }

      if (this.editingUser) {
        payload['token'] = this.editingUser.token;
      }

      this.dialogRef.close(payload);
    }
  }
  
}
