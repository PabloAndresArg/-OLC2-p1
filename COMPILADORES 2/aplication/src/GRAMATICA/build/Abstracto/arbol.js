"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listaShowConsola_1 = require("../Auxiliar/listaShowConsola");
const listaErrores_1 = require("../Errors/listaErrores");
const table_1 = require("../Tabla/table");
class Arbol {
    constructor(instrucciones) {
        this.hijos = instrucciones;
        this.errores = listaErrores_1.ListaErrores.errores;
        listaShowConsola_1.showConsola.salida = ""; // cada vez que genere un arbol nuevo haré una nueva ejecucion
    }
    ejecutarArbol() {
        this.hijos.map((m) => {
            let t = new table_1.Table(null);
            const res = m.ejecucion(t);
        });
        return listaShowConsola_1.showConsola.salida;
    }
}
exports.Arbol = Arbol;
