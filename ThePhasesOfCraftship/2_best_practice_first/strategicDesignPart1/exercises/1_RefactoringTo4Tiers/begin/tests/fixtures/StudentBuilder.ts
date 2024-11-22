import { Student } from "@prisma/client";
import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";

export class StudentBuilder {
    
    static Fake() {
        return new StudentBuilder()
        .withName(faker.person.fullName());
    }

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