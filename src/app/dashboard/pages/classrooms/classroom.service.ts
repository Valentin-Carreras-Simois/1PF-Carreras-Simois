import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom, ClassroomWithStudentAndCourse, CreateClassroomPayload } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private baseApiUrl = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) {}

  getClassrooms(): Observable<ClassroomWithStudentAndCourse[]> {
    const url = `${this.baseApiUrl}/classrooms?_expand=student&_expand=course`;
    return this.httpClient.get<ClassroomWithStudentAndCourse[]>(url);
  }

  deleteClassroom(classroomId: number): Observable<void> {
    const url = `${this.baseApiUrl}/classrooms/${classroomId}`;
    return this.httpClient.delete<void>(url);
  }
}
