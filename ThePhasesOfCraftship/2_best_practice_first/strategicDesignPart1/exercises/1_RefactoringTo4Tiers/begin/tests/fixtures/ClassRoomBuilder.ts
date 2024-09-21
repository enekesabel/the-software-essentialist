import { Class } from "@prisma/client";
import { prisma } from "../../src/database";

export class ClassRoomBuilder {

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