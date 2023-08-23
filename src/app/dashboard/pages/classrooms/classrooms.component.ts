import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassroomActions } from './store/classroom.actions';
import { Observable } from 'rxjs';
import { ClassroomWithStudentAndCourse } from './models';
import { selectClassrooms } from './store/classroom.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ClassroomDialogComponent } from './components/classroom-dialog/classroom-dialog.component';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styles: [
  ]
})
export class ClassroomsComponent implements OnInit {

  displayedColumns = ['id', 'student', 'course', 'type'];
  classrooms$: Observable<ClassroomWithStudentAndCourse[]>;

  constructor(private store:Store, private matDialog:MatDialog){
    this.classrooms$ = this.store.select(selectClassrooms)
  }

  onAdd():void{
    this.matDialog.open(ClassroomDialogComponent)
  }

  ngOnInit(): void {
    this.store.dispatch(ClassroomActions.loadClassrooms())
  }
}
