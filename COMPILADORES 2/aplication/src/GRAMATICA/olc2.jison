%{
    const {Arbol} = require('./build/arbol.js'); 
%}
%lex
%options case-insensitive
entero [0-9]+
decimal {entero}("."{entero})?
stringliteral (\"[^"]*\")
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
%%

\s+                   /* skip whitespace */

{decimal}             return 'decimal' 
{stringliteral}       return 'STRING_LITERAL'
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
.                     console.log('error lexico');
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

INICIO : INSTRUCCIONES EOF {
    $$ = new Arbol($1);
    return $$;
    };

INSTRUCCIONES :  INSTRUCCIONES INSTRUCCION { $$ = $1;  $$.push($2); }
              |  INSTRUCCION               { $$ = [$1]; }
              ;

INSTRUCCION : 'int' 'string' {$$ = $1;}
            | 'string' {$$ = $1;}
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