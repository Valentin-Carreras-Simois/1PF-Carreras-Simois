import { Component } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styles: [
  ]
})
export class StudentDetailComponent {

  public student: Student | undefined;
  public studentId?: number;
  notifierService: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotifierService,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.studentId = +this.activatedRoute.snapshot.params['id'];
    this.loadStudent();
  }

  loadStudent(): void {
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (student) => {
          if (student) {
            this.student = student;
          } else {
            this.notification.showError('Alumno no encontrado', 'Error');
            this.router.navigate(['/dashboard/users']);
          }
        },
        error: (error) => {
          console.error('Error al cargar el usuario: ', error);
        }
      });
    }
  }
}
