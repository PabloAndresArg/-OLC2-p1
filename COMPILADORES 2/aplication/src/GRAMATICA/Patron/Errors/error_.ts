export  class Error_{
    public tipoError: string
    public line: number;
    public descripcion: string;
    constructor(tipoError: string , linea: number , des : string ){
        this.line = linea;
        this.tipoError = tipoError;
        this.descripcion = des;
    }
}
