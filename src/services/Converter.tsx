type TaskType = "bug" | "feature";

export class Converter{
    static stringToTaskType(typeString: string): TaskType{
        if(typeString !== "bug" && typeString !== "feature"){
            throw new Error("Not valid value for TaskType");
        }

        return typeString;
    }
}