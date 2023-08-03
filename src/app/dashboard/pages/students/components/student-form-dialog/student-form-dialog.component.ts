import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent {

  editingStudent?:Student;
  nameControl= new FormControl<string | null>(null,[Validators.required, Validators.minLength(3)]);
  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  turnoControl = new FormControl<string | null>(null, [Validators.required]);


  studentForm= new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    turno: this.turnoControl,
  });

  constructor(
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student,
    ){
      if (this.data) {
        this.editingStudent = this.data;
        this.nameControl.setValue(this.data.name),
        this.surnameControl.setValue(this.data.surname),
        this.turnoControl.setValue(this.data.turno)
      }
    }

  onSubmit():void{
    
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}
