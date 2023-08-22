import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  
  public isAdmin$: Observable<boolean>;

  displayedColumns: string[] = ['id', 'fullName', 'turno', 'actions'];

  constructor(
    private store: Store,
    ){
      this.isAdmin$ = this.store.select(selectIsAdmin)
    }

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();
}
