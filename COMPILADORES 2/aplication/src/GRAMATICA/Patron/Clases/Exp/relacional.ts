import { Nodo } from "../../Abstracto/nodo";
import { Tipo } from "../../Abstracto/tipo";
import { Error_ } from "../../Errors/error_";
import { ListaErrores } from "../../Errors/listaErrores";
import { Table } from "../../Tabla/table";


export class Relacional extends Nodo {
    izq: Nodo;
    der: Nodo;
    op: string;
    constructor(izq: Nodo, der: Nodo, op: string, l: Number, c: Number) {
        super(Tipo.boolean_, l, c);
        this.izq = izq;
        this.der = der;
        this.op = op;
    }
    ejecucion(t: Table) {
        const res_izq = this.izq.ejecucion(t);
        if (res_izq instanceof Error_) return res_izq;
        const res_der = this.der.ejecucion(t);
        if (res_der instanceof Error_) return res_der;
        // si llega  aca es que todo esta correcto
        switch (this.op) {
            // ESTOS OPERADORES SOLO TRABAJAN CON NUMEROS 
            case ">":
                if (this.der.tipo == Tipo.number_ && this.izq.tipo == Tipo.number_) return res_izq > res_der;

                return this.reportarErrorSemantico(` error MAYOR QUE.., no se puede operar ${res_izq} y ${res_der}`);
            case ">=":
                if (this.der.tipo == Tipo.number_ && this.izq.tipo == Tipo.number_) return res_izq >= res_der;

                return this.reportarErrorSemantico(` error MAYOR o IGUAL QUE.., no se puede operar ${res_izq} y ${res_der}`);

            case "<":
                if (this.der.tipo == Tipo.number_ && this.izq.tipo == Tipo.number_) return res_izq < res_der;

                return this.reportarErrorSemantico(` error MENOR QUE.., no se puede operar ${res_izq} y ${res_der}`);

            case "<=":
                if (this.der.tipo == Tipo.number_ && this.izq.tipo == Tipo.number_) return res_izq <= res_der;

                return this.reportarErrorSemantico(` error MENOR O IGUAL QUE.., no se puede operar ${res_izq} y ${res_der}`);

            // aca ya pueden ser strings o incluso booleanos
            case "!=":
                if (this.der.tipo == Tipo.number_ && this.izq.tipo == Tipo.number_ || this.der.tipo == Tipo.string_ && this.izq.tipo == Tipo.string_ || this.der.tipo == Tipo.boolean_ && this.izq.tipo == Tipo.boolean_)
                    return res_izq != res_der;

                return this.reportarErrorSemantico(` error DISFERENTE A, no se puede operar ${res_izq} y ${res_der}`);
            case "==":
                if (this.der.tipo == Tipo.number_ && this.izq.tipo == Tipo.number_ || this.der.tipo == Tipo.string_ && this.izq.tipo == Tipo.string_ || this.der.tipo == Tipo.boolean_ && this.izq.tipo == Tipo.boolean_)
                    return res_izq == res_der;

                return this.reportarErrorSemantico(` error en OPERACION IGUAL , no se puede operar ${res_izq} y ${res_der}`);

            default:
                return this.reportarErrorSemantico(` error Operando desconocido`);
        }
    }

    reportarErrorSemantico(descripcion: string): Error_ {
        let error = new Error_('SEMANTICO', this.linea, descripcion);
        ListaErrores.errores.push(error);
        return error;
    }
}