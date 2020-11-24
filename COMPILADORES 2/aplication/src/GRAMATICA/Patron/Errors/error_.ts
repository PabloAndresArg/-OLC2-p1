export  class Error_{
    public tipoError: string
    public line: Number;
    public descripcion: string;
    constructor(tipoError: string , linea: Number , des : string ){
        this.line = linea;
        this.tipoError = tipoError;
        this.descripcion = des;
    }
}
