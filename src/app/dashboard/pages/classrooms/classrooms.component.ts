import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassroomActions } from './store/classroom.actions';
import { Observable } from 'rxjs';
import { Classroom, ClassroomWithStudentAndCourse } from './models';
import { selectClassrooms } from './store/classroom.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ClassroomDialogComponent } from './components/classroom-dialog/classroom-dialog.component';
import { selectIsAdmin, selectIsUser } from 'src/app/store/auth/auth.selector';
import { ClassroomService } from './classroom.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styles: [
  ]
})
export class ClassroomsComponent implements OnInit {

  public isAdmin$: Observable<boolean>;
  public isUser$: Observable<boolean>;

  displayedColumns = ['id', 'student', 'course', 'type', 'actions'];

  classrooms$: Observable<ClassroomWithStudentAndCourse[]>;

  constructor(
    private store:Store,
    private matDialog:MatDialog,
    private classroomService: ClassroomService,
    private notifier:NotifierService
    ){
    this.classrooms$ = this.store.select(selectClassrooms),
    this.isAdmin$ = this.store.select(selectIsAdmin),
    this.isUser$ = this.store.select(selectIsUser)
  }

  onAdd():void{
    this.matDialog.open(ClassroomDialogComponent)
  }


  ngOnInit(): void {
    this.store.dispatch(ClassroomActions.loadClassrooms())
  }

  ngOnDestroy(): void {}

  onDelete(classroomId: number): void {
    if (confirm(`¿Esta seguro de querer eliminar la inscripcion?`)) {
      this.store.dispatch(ClassroomActions.deleteClassroom({ id: classroomId }));
      this.notifier.showSuccess('Curso eliminado');
    }
  }
}
