import { DTOValidationError } from "./utils";

export class CreateClassDTO {

    static Create({name}: { name: string }): CreateClassDTO | DTOValidationError {
        if(!!name){
            return new CreateClassDTO(name);
        }
        return new DTOValidationError();
    }

    readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }
}