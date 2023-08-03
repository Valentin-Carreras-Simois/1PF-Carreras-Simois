import { Component, Inject } from '@angular/core';
import { Course } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-form-dialog',
  templateUrl: './courses-form-dialog.component.html',
  styleUrls: ['./courses-form-dialog.component.scss']
})
export class CoursesFormDialogComponent {

  editingCourse?:Course;
  nameControl= new FormControl<string | null>(null,[Validators.required, Validators.minLength(3)]);
  modalityControl = new FormControl<string | null>(null, [Validators.required]);
  proffessorControl = new FormControl<string | null>(null, [Validators.required]);


  courseForm= new FormGroup({
    name: this.nameControl,
    modality: this.modalityControl,
    proffessor: this.proffessorControl
  });

  constructor(
    private dialogRef: MatDialogRef<CoursesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course,
    ){
      if (this.data) {
        this.editingCourse = this.data;
        this.nameControl.setValue(this.data.name),
        this.modalityControl.setValue(this.data.modality),
        this.proffessorControl.setValue(this.data.proffessor)
      }
    }

  onSubmit():void{
    
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
