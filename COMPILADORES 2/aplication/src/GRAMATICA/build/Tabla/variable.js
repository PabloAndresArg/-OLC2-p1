"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Variable {
    constructor(id, tipo, reasing, val) {
        this.id = id;
        this.tipo = tipo;
        this.reasing = reasing;
        this.value = val;
    }
    getTipo() { return this.tipo; }
    setTipo(t) { this.tipo = t; }
    getReasing() { return this.reasing; }
}
exports.Variable = Variable;
