import {Variable} from './variable';
export class Table {
    tabVariables: Map<string, Variable>;
    //tabFunciones: Map<string, Funcion>;
    constructor(){
        this.tabVariables = new Map();
    }
}