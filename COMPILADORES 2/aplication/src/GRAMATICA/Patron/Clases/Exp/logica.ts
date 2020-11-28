import { Nodo } from '../../Abstracto/nodo';
import { Table } from '../../Tabla/table';
import { Error_ } from '../../Errors/error_';
import { ListaErrores } from '../../Errors/listaErrores';
import { Tipo } from '../../Abstracto/tipo';
export class Logica extends Nodo {
    Operador: string; // and, or , not
    izq: Nodo;
    der: Nodo;
    // linea tipo y columna como siempre
    constructor(izq: Nodo, der: Nodo, op: string, l: Number, c: Number) {
        // operador izquierdo siempre esta lleno
        super(Tipo.boolean_, l, c);
        this.Operador = op;
        this.izq = izq;
        this.der = der;
    }
    ejecucion(t: Table) {
        if (this.der !== null && this.der !== undefined) {
            const res_izq = this.izq.ejecucion(t);
            if (res_izq instanceof Error_) { return res_izq; }
            const res_der = this.der.ejecucion(t);
            if (res_der instanceof Error_) { return res_der; }
            // si no hay errores ya de acarreo , veo si se puede operar logicamente
            switch (this.Operador) {
                case '||':
                    if (this.der.tipo == Tipo.boolean_ && this.izq.tipo == Tipo.boolean_) {
                        return res_der || res_izq
                    }
                    return this.reportarErrorSemantico(`Error en OR , uno de los dos no es de tipo boolean `);
                case '&&':
                    if (this.der.tipo == Tipo.boolean_ && this.izq.tipo == Tipo.boolean_) {
                        console.log(res_der && res_izq);
                        return res_der && res_izq;
                    }
                    return this.reportarErrorSemantico(`Error en AND , uno de los dos no es de tipo boolean `);

                default:
                    return this.reportarErrorSemantico(` Operador desconocido `);
            }
        } else {
            // unario
            const res_izq = this.izq.ejecucion(t);
            if (res_izq instanceof Error_) { return res_izq; }
            switch (this.Operador) {
                case '!':
                    if (this.izq.tipo == Tipo.boolean_) {
                        return !(res_izq);
                    } else {
                        return this.reportarErrorSemantico(`Error en NOT ,el operando no es de tipo logico`);;
                    }

                default:
                    return this.reportarErrorSemantico(` Operador desconocido `);
            }
        }
    }
    reportarErrorSemantico(descripcion: string): Error_ {
        let error = new Error_('SEMANTICO', this.linea, descripcion);
        ListaErrores.errores.push(error);
        return error;
    }
}
