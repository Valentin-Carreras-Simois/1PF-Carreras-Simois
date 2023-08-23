import { Course } from "../../courses/models";
import { Student } from "../../students/models";

export interface Classroom {
    id: number,
    studentId: number,
    courseId: number,
    type: string
}

export interface ClassroomWithStudentAndCourse extends Classroom {
    student: Student;
    course: Course;
    
}

export interface CreateClassroomPayload {
    studentId: number | null,
    courseId: number | null,
}