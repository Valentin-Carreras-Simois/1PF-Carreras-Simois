import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styles: [
  ]
})
export class CoursesTableComponent {

  public isAdmin$: Observable<boolean>;

  displayedColumns: string[] = ['id', 'name', 'modality', 'proffessor', 'actions'];

  constructor(
    private store: Store,
    ){
      this.isAdmin$ = this.store.select(selectIsAdmin)
    }

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();
}
