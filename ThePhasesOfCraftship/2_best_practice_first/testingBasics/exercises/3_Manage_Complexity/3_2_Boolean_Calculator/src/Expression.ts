import { Value } from "./Value";

export class Expression {

    readonly list: Value[];

    constructor(boolString: string){
        this.list = [Value.TRUE]
    }

}