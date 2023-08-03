import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {

  displayedColumns: string[] = ['id', 'name', 'modality', 'proffessor', 'actions'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();
}
