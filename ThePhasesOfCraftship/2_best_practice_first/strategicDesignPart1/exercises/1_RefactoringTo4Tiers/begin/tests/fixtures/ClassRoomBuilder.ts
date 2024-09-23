import { Class } from "@prisma/client";
import { prisma } from "../../src/database";
import { faker } from '@faker-js/faker';

export class ClassRoomBuilder {

    static Fake() {
        return new ClassRoomBuilder()
        .withName(faker.company.buzzNoun());
    }

    private classRoom = {} as Class;

    withName(name: string) {
        this.classRoom.name = name;
        return this;
    }

    async build() {
        const classRoom= await prisma.class
            .create({
                data: this.classRoom
            })

        return classRoom;
    }

}