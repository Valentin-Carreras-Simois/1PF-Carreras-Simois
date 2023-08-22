import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../students/student.service';
import { Student } from '../../../students/models';
import { Store } from '@ngrx/store';
import { CoursesActions } from '../../store/courses.actions';
import { Observable } from 'rxjs';
import { selectCourseName } from '../../store/courses.selectors';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styles: [
  ]
})
export class CourseDetailComponent implements OnInit {

  displayedColumns = ['id', 'name', 'surname', 'turno'];
  students: Student[] = [];
  courseName$: Observable<string | undefined>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private store: Store
    ){
    this.activatedRoute.snapshot.params;
    this.courseName$ = this.store.select(selectCourseName);
  }
  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourseDetail({ classId: this.activatedRoute.snapshot.params['id']}))
    this.studentService.getStudentsbyClassId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (students) =>(this.students = students)
    })
  }
}
