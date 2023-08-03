import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {

  displayedColumns: string[] = ['id', 'fullName', 'turno', 'actions'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();
}
