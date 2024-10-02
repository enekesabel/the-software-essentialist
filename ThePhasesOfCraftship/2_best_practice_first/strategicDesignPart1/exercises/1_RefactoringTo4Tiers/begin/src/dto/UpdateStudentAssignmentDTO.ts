import { AssingmentGradeDTO, Grade } from "./AssignmentGradeDTO";
import { DTOValidationError } from "./utils";

export class UpdateStudentAssignmentDTO {

    static Create({grade, status}: {grade?: Grade, status?: string}): UpdateStudentAssignmentDTO | DTOValidationError {
        const assignmentGradeDTO = grade ? AssingmentGradeDTO.Create(grade): undefined;
        if(
            (assignmentGradeDTO instanceof AssingmentGradeDTO || assignmentGradeDTO === undefined) && 
            (!!status || status === undefined)) {
            return new UpdateStudentAssignmentDTO(assignmentGradeDTO?.grade, status);
        }
        return new DTOValidationError();
    }

    private constructor(
        readonly grade?: Grade | undefined,
        readonly status?: string | undefined,
    ) {}
}

