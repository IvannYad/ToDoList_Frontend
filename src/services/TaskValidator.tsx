
export default class TaskValidator{
    private validationFunctions: (() => boolean)[];
    constructor(){
        this.validationFunctions = [];
    }

    validate(): boolean{
        let toReturn: boolean = true;
        for(const validationFunc of this.validationFunctions){
            toReturn = toReturn && validationFunc();
        }

        return toReturn;
    }

    addValidation(toAdd: () => boolean){
        this.validationFunctions.push(toAdd);
    }
}