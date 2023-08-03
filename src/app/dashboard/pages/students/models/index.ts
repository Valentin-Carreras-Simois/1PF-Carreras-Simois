export interface Student{
    id: number,
    name: string,
    surname: string,
    turno: string,
}

export interface CreateStudentData{
    name: string,
    surname: string,
    turno: string,
}

export interface UpdateStudentData{
    name?: string,
    surname?: string,
    turno?: string,
}