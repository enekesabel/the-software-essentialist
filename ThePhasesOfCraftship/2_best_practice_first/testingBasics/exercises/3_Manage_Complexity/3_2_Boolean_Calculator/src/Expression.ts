import { Operator } from "./Operator";
import { Value } from "./Value";

export class Expression {

    readonly list: (Value | Operator)[] = []

    constructor(boolString: string){
        const words = boolString.split(' ');
        words.forEach(word=>{
            switch (word) {
                case 'TRUE': this.list.push(Value.TRUE);
                    break;
                case 'FALSE': this.list.push(Value.FALSE);
                    break;
                case 'NOT': this.list.push(Operator.NOT);
                    break;
            }
        })
    }

}