"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error_ {
    constructor(tipoError, linea, des) {
        this.line = linea;
        this.tipoError = tipoError;
        this.descripcion = des;
    }
}
exports.Error_ = Error_;
