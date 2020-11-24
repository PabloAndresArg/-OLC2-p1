import {Variable} from './variable';
export class Table {
    tabVariables: Map<string, Variable>;
    anterior:Table | null;
    //tabFunciones: Map<string, Funcion>;
    constructor(anteriorTabla: Table | null){
        this.anterior = anteriorTabla; 
        this.tabVariables = new Map();
    }
}