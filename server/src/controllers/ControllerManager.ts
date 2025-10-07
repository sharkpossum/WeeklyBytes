import type { IDataController } from "./DataController.js";

class ControllerManager {
    private controllers: Record<string, Record<string, IDataController<any>>> = {}
    private defaultSource: string = "default"

    registerController<T>(sourceName: string, entityName: string,  controller: IDataController<T>){
        if (sourceName){
            if(!this.controllers[sourceName]) {
                this.controllers[sourceName] = {}
            }
            this.controllers[sourceName][entityName] = controller;
        } else {
            throw new Error("Error in registering controller.")
        }
    }

    getController<T>(entityName: string, sourceName?: string): IDataController<T>{
        const targetSource = sourceName ?? this.defaultSource;
        if(!this.controllers[targetSource]){
            throw new Error("No controller for specified data source.")
        }

        const controller = this.controllers[targetSource][entityName];
        if(!controller){
            throw new Error("No entity controller for specified data source.")
        }

        return controller as IDataController<T>;
    }

    // Set the default controller by name, if it's in the registry
    setDefaultSource(controllerName: string){
        if(this.controllers[controllerName]){
            this.defaultSource = controllerName;
        }
    }

    getDefaultSource(){
        return this.defaultSource;
    }
}

export const controllerManger = new ControllerManager()