import { AssingmentGradeDTO, Grade } from "./AssignmentGradeDTO";
import { DTOValidationError } from "./utils";

export class GradeStudentAssignmentDTO {

    static Create({id, grade}: {id: string, grade: string}): GradeStudentAssignmentDTO | DTOValidationError {
        const assignmentGradeDTO = AssingmentGradeDTO.Create(grade);
        if(id && assignmentGradeDTO instanceof AssingmentGradeDTO){
            return new GradeStudentAssignmentDTO(id, assignmentGradeDTO.grade);
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

