import { DTOValidationError } from "./utils";

export class CreateStudentDTO {

    static Create({name}: { name: string }): CreateStudentDTO | DTOValidationError {
        if(!!name){
            return new CreateStudentDTO(name);
        }
        return new DTOValidationError();
    }

    readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }
}