import { Component, OnInit } from '@angular/core';
import { Course } from './models';
import { CourseService } from './course.service';
import { Observable, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesFormDialogComponent } from './components/courses-form-dialog/courses-form-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent {
  
  public courses: Observable<Course[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private courseService: CourseService ,
    private notifier: NotifierService,
    ){
      this.courseService.loadCourses();
      this.isLoading$ = this.courseService.isLoading$;
      this.courses = this.courseService.getCourses().pipe(
        map((valor) => 
          valor.map((curso) => ({
            ...curso,
            name: curso.name.toUpperCase(),
            modality:curso.modality.toUpperCase(),
          }))
        )
      );
      
    }

  onCreateCourse(): void{
    const dialogRef = this.matDialog.open(CoursesFormDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v)=>{
        if (v) {
        this.notifier.showSuccess('Se cargo el curso correctamente');
        this.courseService.createCourse({
              name: v.name,
              modality: v.modality,
              proffessor: v.proffessor
        });  
        }else{

        }
        }
    });
  }

  onDeleteCourse(courseToDelete:Course):void{
    if (confirm(`¿Esta seguro de querer eliminar a ${courseToDelete.name}?`)) {
      this.courseService.deleteCourseById(courseToDelete.id);
      this.notifier.showSuccess('Curso eliminado');
    }
  }

  onEditCourse(courseToEdit:Course):void{
    this.matDialog.open(CoursesFormDialogComponent,
      {
        data:courseToEdit
      })
    .afterClosed()
    .subscribe({
      next: (courseUpdated)=>{
        if (courseUpdated) {
          this.courseService.updateCourseById(courseToEdit.id, courseUpdated);
          this.notifier.showInfo('Se actualizo la informacion correctamente');
        }
        }
    })
  }
}
