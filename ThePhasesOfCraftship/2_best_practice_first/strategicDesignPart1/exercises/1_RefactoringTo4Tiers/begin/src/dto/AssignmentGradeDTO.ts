import { DTOValidationError } from "./utils";

const validGrades = ['A', 'B', 'C', 'D'] as const;
export type Grade = typeof validGrades[number];

export class AssingmentGradeDTO {

    static Create(grade: string): AssingmentGradeDTO | DTOValidationError {
        if(validGrades.includes(grade as Grade)){
            return new AssingmentGradeDTO(grade as Grade);
        }
        return new DTOValidationError();
    }
    readonly grade: Grade;

    private constructor(grade: Grade) {
        this.grade = grade;
    }
}

