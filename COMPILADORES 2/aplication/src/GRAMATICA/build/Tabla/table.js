"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Table {
    //tabFunciones: Map<string, Funcion>;
    constructor(anteriorTabla) {
        this.anterior = anteriorTabla;
        this.tabVariables = new Map();
    }
    saveVariable(v) {
        let ambito; // es una lista simple con punteros hacia atras
        for (ambito = this; ambito != null; ambito = ambito.anterior) {
            if (ambito.tabVariables.has(v.id) === true) {
                return `la variabel ${v.id} ya habia sido declarada`; // aun no retorno el error sino que solo un string 
            }
        }
        this.tabVariables.set(v.id, v);
        return null; // no necesario
    }
    getVariable(id) {
        let ambito; // es una lista simple con punteros hacia atras
        for (ambito = this; ambito != null; ambito = ambito.anterior) {
            if (ambito.tabVariables.has(id) === true) {
                return ambito.tabVariables.get(id);
            }
        }
        return null;
    }
}
exports.Table = Table;
