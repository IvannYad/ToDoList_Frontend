
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

    remvoeValidation(toRemove: () => boolean){
        const indexRemoveAt = this.validationFunctions.indexOf(toRemove, 0);
        if(indexRemoveAt !== -1){
            this.validationFunctions.splice(indexRemoveAt, 1)
        }
    }
}