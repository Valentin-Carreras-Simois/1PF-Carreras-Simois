import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Student } from './models';
import { StudentService } from './student.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styles: [
  ]
})
export class StudentsComponent {

  public students: Observable<Student[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService ,
    private notifier: NotifierService,
    ){
      this.studentService.loadStudents();
      this.isLoading$ = this.studentService.isLoading$;
      this.students = this.studentService.getStudents().pipe(
        map((valor) => 
          valor.map((estudiante) => ({
            ...estudiante,
            name: estudiante.name.toUpperCase(),
            surname:estudiante.surname.toUpperCase(),
          }))
        )
      );
      
    }

  onCreateStudent(): void{
    const dialogRef = this.matDialog.open(StudentFormDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v)=>{
        if (v) {
        this.notifier.showSuccess('Se cargo el alumno correctamente');
        this.studentService.createStudent({
              name: v.name,
              surname: v.surname,
              turno: v.turno
        });  
        }else{

        }
        }
    });
  }

  onDeleteStudent(studentToDelete:Student):void{
    if (confirm(`¿Esta seguro de querer eliminar a ${studentToDelete.name}?`)) {
      this.studentService.deleteStudentById(studentToDelete.id);
      this.notifier.showSuccess('Alumno eliminado');
    }
  }

  onEditStudent(studentToEdit:Student):void{
    this.matDialog.open(StudentFormDialogComponent,
      {
        data:studentToEdit
      })
    .afterClosed()
    .subscribe({
      next: (studentUpdated)=>{
        if (studentUpdated) {
          this.studentService.updateStudentById(studentToEdit.id, studentUpdated);
          this.notifier.showInfo('Se actualizo la informacion correctamente');
        }
        }
    })
  }

}
