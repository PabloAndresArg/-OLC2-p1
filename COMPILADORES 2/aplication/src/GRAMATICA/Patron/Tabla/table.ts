import {Variable} from './variable';
export class Table {
    tabVariables: Map<string , Variable>;
    anterior:Table | null;
    //tabFunciones: Map<string, Funcion>;
    constructor(anteriorTabla: Table | null ){
        this.anterior = anteriorTabla; 
        this.tabVariables = new Map<string,Variable>();
        
    }

    saveVariable(v :Variable): any{
        let ambito: Table | null ; // es una lista simple con punteros hacia atras
        for(ambito = this; ambito != null ;ambito = ambito.anterior){

            if(ambito.tabVariables.has(v.id) === true){
                    return `la variabel ${v.id} ya habia sido declarada`;// aun no retorno el error sino que solo un string 
                }
            
        }
        this.tabVariables.set(v.id ,v);
        return null ; // no necesario
    }
    getVariable(id: string): Variable | any{
        let ambito: Table | null ; // es una lista simple con punteros hacia atras
        for(ambito = this; ambito != null ;ambito = ambito.anterior){
            if(ambito.tabVariables.has(id) === true){
                return ambito.tabVariables.get(id);
            }
        }
        return null;
    }
}