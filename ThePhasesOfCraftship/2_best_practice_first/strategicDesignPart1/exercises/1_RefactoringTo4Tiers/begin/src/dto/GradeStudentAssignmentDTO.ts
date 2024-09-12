import { DTOValidationError } from "./utils";

const validGrades = ['A', 'B', 'C', 'D'] as const;
type Grade = typeof validGrades[number];

export class GradeStudentAssignmentDTO {

    static Create({id, grade}: {id: string, grade: Grade}): GradeStudentAssignmentDTO | DTOValidationError {
        if(id && validGrades.includes(grade)){
            return new GradeStudentAssignmentDTO(id, grade);
        }
        return new DTOValidationError();
    }

    readonly id: string;
    readonly grade: Grade;

    private constructor(id: string, grade: Grade) {
        this.id = id;
        this.grade = grade;
    }
}

