import { Nodo } from "../../Abstracto/nodo";
import { Table } from "../../Tabla/table";
import { Error_ } from "./../../Errors/error_";
import { Tipo } from "./../../Abstracto/tipo"; // siempre relativo por el build
import { ListaErrores } from "../../Errors/listaErrores";
export class Aritmetica extends Nodo {

    izq: Nodo;
    der: Nodo | null;
    operacion: string;
    constructor(izq: Nodo, operacion: any, der: Nodo | null, linea: any, col: any) {
        super(Tipo.any_, linea, col);
        this.izq = izq;
        this.der = der;
        this.operacion = operacion;
    }
    ejecucion(t: Table) {// el arbol no lo paso porque manejare los errores como algo independiente de mi arbol
        if (this.der !== null) {// verificando que sean 2 operandos
            const resultadoIzq = this.izq.ejecucion(t);
            if (resultadoIzq instanceof Error_) {
                return resultadoIzq
            }
            const resultadoDer = this.der.ejecucion(t);
            if (resultadoDer instanceof Error_) {
                return resultadoDer
            }
            // LLEGA ACA SI NINGUNO DE LOS DOS OPERADORES ES ERROR
            switch (this.operacion) {
                case "+":

                    if (this.izq.tipo === Tipo.number_ && this.der.tipo === Tipo.number_) {// OPERACION ENTRE ENTEROS 
                        this.tipo = Tipo.number_;// porque opera binariamente de 2 en 2 entonces el resultado este tiene que seguirsiendo de tipo number
                        return resultadoIzq + resultadoDer;
                    } else if (this.izq.tipo === Tipo.string_ || this.der.tipo === Tipo.string_) {// ES CONCATENACION DE STRINGS , por eso es un O´ logico
                        this.tipo = Tipo.string_;
                        return resultadoIzq + resultadoDer;// opero los que devuelve el ejecutar
                    } else {
                        return this.reportarErrorSemantico(` error, no se puede operar ${resultadoIzq} y ${resultadoDer}`); // alt + 96 para comillas raras 
                    }
                case "-":

                    if (this.izq.tipo === Tipo.number_ && this.der.tipo === Tipo.number_) {// OPERACION ENTRE ENTEROS 
                        this.tipo = Tipo.number_;// porque opera binariamente de 2 en 2 entonces el resultado este tiene que seguirsiendo de tipo number
                        return resultadoIzq - resultadoDer;
                    }// else
                    return this.reportarErrorSemantico(` error, no se puede operar ${resultadoIzq} y ${resultadoDer}`);
                case "*":

                    if (this.izq.tipo === Tipo.number_ && this.der.tipo === Tipo.number_) {// OPERACION ENTRE ENTEROS 
                        this.tipo = Tipo.number_;// porque opera binariamente de 2 en 2 entonces el resultado este tiene que seguirsiendo de tipo number
                        return resultadoIzq * resultadoDer;
                    }//else
                    return this.reportarErrorSemantico(` error, no se puede operar ${resultadoIzq} y ${resultadoDer}`);
                case "/":

                    if (this.izq.tipo === Tipo.number_ && this.der.tipo === Tipo.number_) {// OPERACION ENTRE ENTEROS 
                        this.tipo = Tipo.number_;// porque opera binariamente de 2 en 2 entonces el resultado este tiene que seguirsiendo de tipo number
                        if (resultadoDer === 0) {
                            return new Error_('SEMANTICO', this.linea, ` error, no se puede dividir entre 0`);
                        }
                        return resultadoIzq / resultadoDer;
                    }
                    return this.reportarErrorSemantico(` error, no se puede operar ${resultadoIzq} y ${resultadoDer}`);
                default:

                    return this.reportarErrorSemantico(` Operador desconocido `);
            }
        } else {// SOLO VIENE UN OPERADOR
            let resultIzq = this.izq.ejecucion(t);

            if (resultIzq instanceof Error_) {
                return resultIzq;
            }
            switch (this.operacion) {
                case '-':
                    if (this.izq.tipo === Tipo.number_) {
                        this.tipo = Tipo.number_;
                        return resultIzq * -1;
                    }
                    return this.reportarErrorSemantico(` error con Operador Unario TIPOS DIFERENTES con  ${resultIzq} `);
                default:
                    return this.reportarErrorSemantico(` error con Operador irreconosible`);
            }
        }
    }

    reportarErrorSemantico(descripcion: string): Error_ {
        let error = new Error_('SEMANTICO', this.linea, descripcion);
        ListaErrores.errores.push(error);
        return error;
    }
}