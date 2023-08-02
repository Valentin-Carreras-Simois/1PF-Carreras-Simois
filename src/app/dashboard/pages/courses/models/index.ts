export interface Course{
    id: number,
    name: string,
    modality: string,
    proffessor: string,
}

export interface CreateCourseData{
    name: string,
    modality: string,
    proffessor: string,
}

export interface UpdateCourseData{
    name?: string,
    modality?: string,
    proffessor?: string,
}

