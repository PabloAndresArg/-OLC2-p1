"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Table {
    //tabFunciones: Map<string, Funcion>;
    constructor(anteriorTabla) {
        this.anterior = anteriorTabla;
        this.tabVariables = new Map();
    }
}
exports.Table = Table;
