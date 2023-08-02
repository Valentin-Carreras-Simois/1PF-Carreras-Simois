import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styles: [
  ]
})
export class StudentsComponent implements OnInit {

  public dataSource: Student[]= [];

  public data$: Observable <Student[]>;

  public displayedColumns = ['id', 'name', 'surname', 'age', 'actions'];

  constructor(private studentService: StudentService){
    this.data$ = this.studentService.getStudents();
  }

  ngOnInit(): void {
    this.studentService.loadStudents();
    this.studentService.getStudents().subscribe();
  }

  onCreate():void{
    this.studentService.create();
  }

  onDelete(id:number):void{
    this.studentService.deleteById(id);
  }

}
