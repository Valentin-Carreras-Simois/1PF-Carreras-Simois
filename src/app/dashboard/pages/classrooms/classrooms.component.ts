import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassroomActions } from './store/classroom.actions';
import { Observable } from 'rxjs';
import { ClassroomWithStudentAndCourse } from './models';
import { selectClassrooms } from './store/classroom.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ClassroomDialogComponent } from './components/classroom-dialog/classroom-dialog.component';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styles: [
  ]
})
export class ClassroomsComponent implements OnInit {

  public isAdmin$: Observable<boolean>;

  displayedColumns = ['id', 'student', 'course', 'type', 'actions'];
  classrooms$: Observable<ClassroomWithStudentAndCourse[]>;

  constructor(private store:Store, private matDialog:MatDialog){
    this.classrooms$ = this.store.select(selectClassrooms),
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  onAdd():void{
    this.matDialog.open(ClassroomDialogComponent)
  }


  ngOnInit(): void {
    this.store.dispatch(ClassroomActions.loadClassrooms())
  }
}
