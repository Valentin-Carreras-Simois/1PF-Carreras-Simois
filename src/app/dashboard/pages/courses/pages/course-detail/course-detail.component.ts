import { Component } from '@angular/core';
import { Student } from '../../../students/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Course } from '../../models';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {

  public course: Course | undefined;
  public courseId?: number;
  notifierService: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotifierService,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    this.courseId = +this.activatedRoute.snapshot.params['id'];
    this.loadCourse();
  }

  loadCourse(): void {
    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          if (course) {
            this.course = course;
          } else {
            this.notification.showError('Curso no encontrado', 'Error');
            this.router.navigate(['/dashboard/users']);
          }
        },
        error: (error) => {
          console.error('Error al cargar el curso: ', error);
        }
      });
    }
  }
}
