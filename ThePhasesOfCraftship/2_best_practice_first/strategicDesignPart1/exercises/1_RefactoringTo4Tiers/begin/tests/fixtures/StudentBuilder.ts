import { Student } from "@prisma/client";
import { prisma } from "../../src/database";

export class StudentBuilder {

    private student = {} as Student;

    withName(name: string) {
        this.student.name = name;
        return this;
    }

    async build() {
        const student= await prisma.student
            .create({
                data: this.student
            })

        return student;
    }
}