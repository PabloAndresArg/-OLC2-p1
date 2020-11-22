"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Variable {
    constructor(id, tipo, reasing, value) {
        this.id = id;
        this.tipo = tipo;
        this.reasing = reasing;
        this.value = this.value;
    }
    getTipo() { return this.tipo; }
    setTipo(t) { this.tipo = t; }
    getReasing() { return this.reasing; }
}
exports.Variable = Variable;
