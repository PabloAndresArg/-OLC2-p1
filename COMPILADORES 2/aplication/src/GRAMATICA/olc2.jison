%{
    const {Arbol} = require('./build/Abstracto/arbol.js'); 
    const {Auxiliar} = require('./build/Auxiliar/auxiliar.js');
    const {ListaErrores} =  require('./build/Errors/listaErrores.js');
    const {Aritmetica} = require('./build/Clases/Exp/aritemtica.js');
    const {ConsoleLog} = require('./build/Clases/Ins/consoleLog.js');
    const {Error_} = require('./build/Errors/error_.js');
    const {Primitivo} = require('./build/Clases/Exp/primitivo.js');
    const {Tipo} = require('./build/Abstracto/tipo.js');
    let aux_ = new Auxiliar();
%}
%lex
%options case-insensitive
entero [0-9]+
decimal {entero}["."]{entero}
stringliteral (\"[^\n]*\")
id ([a-zA-Z_])[a-zA-Z0-9_]*
%%

\s+                   /* skip whitespace */
{decimal}             return 'decimal' 
{entero}              return 'entero'
{stringliteral}       {aux_.tieneComillasDoblesAdentro(this.yy.lexer.matched); return 'STRING_LITERAL'}
"*"                   return '*'
"/"                   return '/'
";"                   return ';'
"."                   return '.'
"-"                   return '-'
"+"                   return '+'
"*"                   return '*'

"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='

"("                   return '('
")"                   return ')'  
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"true"                return 'true'
"false"               return 'false'
"print"               return 'print'
"if"                  return 'if'
"else"                return 'else'
"break"               return 'break'
"continue"            return 'continue'
"while"               return 'while'
"int"                 return 'int'
"string"              return 'string'
"boolean"             return 'boolean'
"double"              return 'double'
"char"                return 'char'
"console"             return 'console'
"log"                 return 'log'
{id}                  return 'id'
.                     {console.log(yylloc);ListaErrores.errores.push(new Error_('LEXICO' , yylloc.first_line ,'El caracter: '+ yytext +' de la columna ['+yylloc.first_column+'] no se reconoce'));} 
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
    | SENTENCIA_IF { console.log('if ejecutado')}
    | CONSOLA {$$ = $1;}
    | EXP ';' ';'
    | ControlsError
    ;
ControlsError: error ';' { ListaErrores.errores.push(new Error_('SINTACTICO' , this._$.first_line ,'columna:'+this._$.first_column+'  error:'+yytext));}
             | error     { ListaErrores.errores.push(new Error_('SINTACTICO' , this._$.first_line ,'columna:'+this._$.first_column+'  error:'+yytext));}
             ;
DECLARACION_VAR: TIPO id ';'
               | TIPO id '=' EXP ';'
               ;
TIPO: 'int'     {$$ = $1; /* tengo que crear el tipo */}
    | 'string'  {$$ = $1}
    | 'boolean' {$$ = $1}
    | 'double'  {$$ = $1}
    ;

CONSOLA: 'console' '.' 'log' '(' EXP ')' ';' { $$ = new ConsoleLog($5 ,this._$.first_line,this._$.first_column);}
       ;

SENTENCIA_IF: if CONDICION BLOQUE_INSTR                     {   }
            | if CONDICION BLOQUE_INSTR else BLOQUE_INSTR   {   }
            | if CONDICION BLOQUE_INSTR else SENTENCIA_IF   {   }
            ;
CONDICION: '(' EXP ')' {$$ = $2;}
         ;

BLOQUE_INSTR : '{' INSTR '}' {$$ = $2;}              /* este es para que acepte vacios*/
             | '{' '}'    {$$ = [];}
             ;

EXP : '-' EXP %prec UMENOS  { }
    | '!' EXP	            { }
    | EXP '+' EXP           { $$ = new Aritmetica($1 , $2 , $3,this._$.first_line , this._$.first_column); }
    | EXP '-' EXP           { }
    | EXP '*' EXP           { }
    | EXP '/' EXP	        { }
    | EXP '<' EXP	        { }
    | EXP '>' EXP           { }
    | EXP '>=' EXP	        { }
    | EXP '<=' EXP	        { }
    | EXP '==' EXP	        { }
    | EXP '!=' EXP	        { }
    | EXP '||' EXP	        { }
    | EXP '&&' EXP	        { }
    | 'decimal'		        {console.log('decimal'); $$ = new Primitivo(Tipo.double_ , Number($1) , this._$.first_line , this._$.first_column);}
    | 'true'				{ }
    | 'false'				{ }
    | 'STRING_LITERAL'		{ }
    | 'entero'              {console.log('entero'); $$ = new Primitivo(Tipo.number_ , Number($1) , this._$.first_line , this._$.first_column);}
    | '(' EXP ')'		    { $$ = $2; }
    ;