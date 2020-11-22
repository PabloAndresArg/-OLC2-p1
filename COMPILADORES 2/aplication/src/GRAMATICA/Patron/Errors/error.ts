export class Error{
    tipoError: string
    line: Number;
    descripcion: string;
    constructor(tipoError: string , linea: Number , des : string ){
        this.line = linea;
        this.tipoError = tipoError;
        this.descripcion = des;
    }
}