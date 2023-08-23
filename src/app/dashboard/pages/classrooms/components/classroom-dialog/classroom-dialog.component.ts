import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../../students/models';
import { Course } from '../../../courses/models';
import { ClassroomActions } from '../../store/classroom.actions';
import { selectCoursesOptions, selectStudentsOptions } from '../../store/classroom.selectors';

@Component({
  selector: 'app-classroom-dialog',
  templateUrl: './classroom-dialog.component.html',
  styles: [
  ]
})
export class ClassroomDialogComponent implements OnInit {

  courseIdControl = new FormControl(null, Validators.required);
  studentIdControl = new FormControl(null, Validators.required);
  typeControl = new FormControl(null, Validators.required);

  classroomForm = new FormGroup({
    courseId: this.courseIdControl,
    studentId: this.studentIdControl,
    type:this.typeControl
  });

  studentOptions$: Observable<Student[]>;
  courseOptions$: Observable<Course[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<ClassroomDialogComponent>) {
    this.studentOptions$ = this.store.select(selectStudentsOptions);
    this.courseOptions$ = this.store.select(selectCoursesOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(ClassroomActions.loadCoursesOptions());
    this.store.dispatch(ClassroomActions.loadStudentsOptions());
  }

  onSubmit(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
    } else {
      this.store.dispatch(ClassroomActions.createClassrooms({ payload: this.classroomForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }


}
