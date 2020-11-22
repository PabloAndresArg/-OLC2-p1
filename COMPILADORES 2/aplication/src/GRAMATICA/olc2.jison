%{
    const {Arbol} = require('./build/Abstracto/arbol.js'); 
    const {Auxiliar} = require('./build/Auxiliar/auxiliar.js');
    const {ListaErrores} =  require('./build/Errors/listaErrores.js');
    const {Error_} = require('./build/Errors/error_.js');
    let aux_ = new Auxiliar();
%}
%lex
%options case-insensitive
entero [0-9]+
decimal {entero}("."{entero})?
stringliteral (\"[^\n]*\")
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
%%

\s+                   /* skip whitespace */
{decimal}             return 'decimal' 
{stringliteral}       {console.log('STRING:'); aux_.tieneComillasDoblesAdentro(this.yy.lexer.matched); return 'STRING_LITERAL'}
"*"                   return '*'
"/"                   return '/'
";"                   return ';'
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
{identifier}          return 'identifier'
.                     {console.log('error lexico');ListaErrores.errores.push(new Error_('LEXICO' , 0 ,'lexico error ¿bro'));} 
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

INICIO : INSTRUCCIONES EOF {return new Arbol($1);};

INSTRUCCIONES :  INSTRUCCIONES INSTRUCCION { $$ = $1;  $$.push($2); }
              |  INSTRUCCION               { $$ = [$1]; }
              ;

INSTRUCCION : 'int' 'string' {$$ = $1;}
            | EXPRESION  ':'{}
            | SENTENCIA_IF { console.log('if ejecutado')}
            | error ';' { console.log('error sintactico')}
            ;

SENTENCIA_IF: if CONDICION BLOQUE_INSTRUCCIONES
            | if CONDICION BLOQUE_INSTRUCCIONES else BLOQUE_INSTRUCCIONES
            | if CONDICION BLOQUE_INSTRUCCIONES else SENTENCIA_IF
            ;
CONDICION : '(' EXPRESION ')' {$$ = $2;}
          ;
BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = $2;}              /* este es para que acepte vacios*/
                     | '{' '}'    {$$ = [];}
                     ;

EXPRESION : '-' EXPRESION %prec UMENOS	    {  }
          | '!' EXPRESION	                  { }
          | EXPRESION '+' EXPRESION           { }
          | EXPRESION '-' EXPRESION           { }
          | EXPRESION '*' EXPRESION           { }
          | EXPRESION '/' EXPRESION	    {  }
          | EXPRESION '<' EXPRESION	    {  }
          | EXPRESION '>' EXPRESION     {  }
          | EXPRESION '>=' EXPRESION	{ }
          | EXPRESION '<=' EXPRESION	    { }
          | EXPRESION '==' EXPRESION	    {  }
          | EXPRESION '!=' EXPRESION	    { }
          | EXPRESION '||' EXPRESION	    { }
          | EXPRESION '&&' EXPRESION	    {  }
          | 'decimal'		           { }
          | 'true'				    { }
          | 'false'				    { }
          | STRING_LITERAL			{ }
          | entero                  { }
          | '(' EXPRESION ')'		{ $$ = $2; }
          ;