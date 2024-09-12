import { DTOValidationError } from "./utils";

export class CreateAssignmentDTO {

    static Create({classId, title }: { classId: string, title: string }): CreateAssignmentDTO | DTOValidationError {
        if(classId && title){
            return new CreateAssignmentDTO(classId, title);
        }
        return new DTOValidationError();
    }

    readonly classId: string;
    readonly title: string;

    private constructor(classId: string, title: string) {
        this.classId = classId;
        this.title = title;
    }
}