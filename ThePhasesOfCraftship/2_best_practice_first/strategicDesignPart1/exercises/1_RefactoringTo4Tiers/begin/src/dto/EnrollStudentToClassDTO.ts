import { DTOValidationError } from "./utils";

export class EnrollStudentToClassDTO {

    static Create({classId, studentId }: { classId: string, studentId: string }): EnrollStudentToClassDTO | DTOValidationError {
        if(classId && studentId){
            return new EnrollStudentToClassDTO(classId, studentId);
        }
        return new DTOValidationError();
    }

    readonly classId: string;
    readonly studentId: string;

    private constructor(classId: string, title: string) {
        this.classId = classId;
        this.studentId = title;
    }
}