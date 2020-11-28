%{
    const {Arbol} = require('./build/Abstracto/arbol.js'); 
    const {Auxiliar} = require('./build/Auxiliar/auxiliar.js');
    const {ListaErrores} =  require('./build/Errors/listaErrores.js');
    const {Aritmetica} = require('./build/Clases/Exp/aritemtica.js');
    const {ConsoleLog} = require('./build/Clases/Ins/consoleLog.js');
    const {Error_} = require('./build/Errors/error_.js');
    const {Primitivo} = require('./build/Clases/Exp/primitivo.js');
    const {Tipo} = require('./build/Abstracto/tipo.js');
    const {Logica} = require('./build/Clases/Exp/logica.js');
    const {Id} = require('./build/Clases/Exp/id.js');
    const {Relacional} = require('./build/Clases/Exp/relacional.js')
    const {Declaracion} = require('./build/Clases/Ins/declaracion.js');
    let aux_ = new Auxiliar();
%}
%lex
%options case-insensitive
entero [0-9]+
decimal {entero}["."]{entero}
cadenaStr \"(\\\"|[^\"])*\"
cadenaSimp \'(\\\"|[^\'])*\'
cadenarara \`(\\\"|[^\`])*\`
id ([a-zA-Z_])[a-zA-Z0-9_]*
%%

\s+                   /* skip whitespace */
{decimal}             return 'decimal' 
{entero}              return 'entero'
{cadenaStr}          {yytext = yytext.substr(1,yyleng-2); return 'cadenaStr'}
{cadenaSimp}         {yytext = yytext.substr(1,yyleng-2); return 'cadenaStr'}
{cadenarara}         {yytext = yytext.substr(1,yyleng-2); return 'cadenaStr'}
"*"                   return '*'
"/"                   return '/'
";"                   return ';'
"."                   return '.'
"-"                   return '-'
"+"                   return '+'
"*"                   return '*'


"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"!="                  return '!='
"!"                   return '!'
"=="                  return '=='
"="                   return '='
"||"                  return '||'
"&&"                  return '&&'



"("                   return '('
")"                   return ')'  
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"true"                return 'true'
"false"               return 'false'
"if"                  return 'if'
"else"                return 'else'
"break"               return 'break'
"continue"            return 'continue'
"while"               return 'while'
"int"                 return 'int'
"string"              return 'string'
"boolean"             return 'boolean'
"double"              return 'double'
"console"             return 'console'
"log"                 return 'log'
{id}                  return 'id'
.                     {ListaErrores.errores.push(new Error_('LEXICO' , yylloc.first_line ,'El caracter: '+ yytext +' de la columna ['+yylloc.first_column+'] no se reconoce'));} 
<<EOF>>	              return 'EOF'

/lex
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%right '!'
%left UMENOS

%start INICIO

%%

INICIO : INSTR EOF { return new Arbol($1); };

INSTR :  INSTR INS { $$ = $1;  $$.push($2); }
      |  INS       { $$ = [$1]; }
      ;

INS : DECLARACION_VAR {$$ = $1;}
    | SENTENCIA_IF    { }
    | CONSOLA {$$ = $1;}
    | ControlsError
    ;
ControlsError: error ';' { ListaErrores.errores.push(new Error_('SINTACTICO' , this._$.first_line ,'columna:'+this._$.first_column+'  error:'+yytext));}
             | error     { ListaErrores.errores.push(new Error_('SINTACTICO' , this._$.first_line ,'columna:'+this._$.first_column+'  error:'+yytext));}
             ;
DECLARACION_VAR: TIPO id '=' EXP ';' {let dec_ = new Declaracion($1 , $2  , this._$.first_line , _$.first_colomn); dec_.setValor($4); $$ = dec_} 
               | TIPO id ';' { $$ = new Declaracion($1 , $2  , this._$.first_line , _$.first_colomn);}
               ;
TIPO: 'int'     {$$ = Tipo.number_;; /* tengo que crear el tipo */}
    | 'string'  {$$ = Tipo.string_;}
    | 'boolean' {$$ = Tipo.boolean_;}
    | 'double'  {$$ = TIPO.double_;}
    ;

CONSOLA: 'console' '.' 'log' '(' EXP ')' ';' { $$ = new ConsoleLog($5 ,this._$.first_line,this._$.first_column);}
       ;

SENTENCIA_IF: if CONDICION BLOQUE_INSTR                     {   }
            | if CONDICION BLOQUE_INSTR else BLOQUE_INSTR   {   }
            | if CONDICION BLOQUE_INSTR else SENTENCIA_IF   {   }
            ;
CONDICION: '(' EXP ')' {$$ = $2;}
         ;

BLOQUE_INSTR : '{' INSTR '}' {$$ = $2;} 
             | '{' '}'       {$$ = [];} /* este es para que acepte vacios*/
             ;

EXP : '-' EXP %prec UMENOS  { $$ = new Aritmetica($2,'-',null,this._$.first_line , this._$.first_column); }
    | '!' EXP	            { $$ = new Logica($2,null,$2,this._$.first_line , this._$.first_colomn);  }
    | EXP '||' EXP	        { $$ = new Logica($1,$3,$2,this._$.first_line , this._$.first_colomn); }
    | EXP '&&' EXP	        { $$ = new Logica($1,$3,$2,this._$.first_line , this._$.first_colomn); }
    | EXP '+' EXP           { $$ = new Aritmetica($1 , $2 , $3,this._$.first_line , this._$.first_column); }
    | EXP '-' EXP           { $$ = new Aritmetica($1 , $2 , $3,this._$.first_line , this._$.first_column); }
    | EXP '*' EXP           { $$ = new Aritmetica($1 , $2 , $3,this._$.first_line , this._$.first_column); }
    | EXP '/' EXP	        { $$ = new Aritmetica($1 , $2 , $3,this._$.first_line , this._$.first_column); }
    | EXP '<' EXP	        { $$ = new Relacional($1 , $3 , $2 , this._$.first_line , this._$.first_column); }
    | EXP '>' EXP           { $$ = new Relacional($1 , $3 , $2 , this._$.first_line , this._$.first_column); }
    | EXP '>=' EXP	        { $$ = new Relacional($1 , $3 , $2 , this._$.first_line , this._$.first_column); }
    | EXP '<=' EXP	        { $$ = new Relacional($1 , $3 , $2 , this._$.first_line , this._$.first_column); }
    | EXP '==' EXP	        { $$ = new Relacional($1 , $3 , $2 , this._$.first_line , this._$.first_column); }
    | EXP '!=' EXP	        { $$ = new Relacional($1 , $3 , $2 , this._$.first_line , this._$.first_column); }
    | 'decimal'		        { $$ = new Primitivo(Tipo.number_ , Number($1) , this._$.first_line , this._$.first_column);}
    | 'true'				{ $$ = new Primitivo(Tipo.boolean_ , true , this._$.first_line , this._$.first_colomn);}
    | 'false'				{ $$ = new Primitivo(Tipo.boolean_ , false , this._$.first_line , this._$.first_colomn); }
    | 'cadenaStr'		    { $$ = new Primitivo(Tipo.string_ , $1.replace(/\"/g,"") , _$.first_line , this._$.first_colomn); }
    | 'entero'              { $$ = new Primitivo(Tipo.number_ , Number($1) , this._$.first_line , this._$.first_column);}
    | 'id'                  { $$ = new Id($1 ,  this._$.first_line , this._$.first_colomn);}
    | '(' EXP ')'		    { $$ = $2; }
    ;