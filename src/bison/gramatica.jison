%{
const tablaSim = [];
let nSim = 0;
const tablaCod = [];
let cx = -1;
let nVarTemp = 0;
let lexema = '';

function yyerror(msg) {
  console.log('Error: ' + msg);
}

function generaCodigo(op, a1, a2, a3) {
  cx++;
  tablaCod[cx] = { op, a1, a2, a3 };
}

function localizaSimb(nom, tok) {
  for (let i = 0; i < nSim; i++) {
    if (tablaSim[i].nombre === nom) {
      return i;
    }
  }

  tablaSim[nSim] = { nombre: nom, token: tok };
  if (tok === 'ID') {
    tablaSim[nSim].valor = 0.0;
  }
  if (tok === 'NUM') {
    tablaSim[nSim].valor = parseFloat(nom);
  }
  nSim++;

  return nSim - 1;
}

function imprimeTablaSim() {
  for (let i = 0; i < nSim; i++) {
    console.log(i + ' nombre=' + tablaSim[i].nombre + ' tok=' + tablaSim[i].token + ' valor=' + tablaSim[i].valor);
  }
}

function imprimeTablaCod() {
  for (let i = 0; i <= cx; i++) {
    console.log(i + ' op=' + tablaCod[i].op + ' a1=' + tablaCod[i].a1 + ' a2=' + tablaCod[i].a2 + ' a3=' + tablaCod[i].a3);
  }
}

function interpretaCodigo() {
  for (let i = 0; i <= cx; i++) {
    const { op, a1, a2, a3 } = tablaCod[i];
    if (op === 'ASIGNAR') {
      tablaSim[a1].valor = tablaSim[a2].valor;
    }
    if (op === 'SUMAR') {
      tablaSim[a1].valor = tablaSim[a2].valor + tablaSim[a3].valor;
    }
    if (op === 'RESTAR') {
      tablaSim[a1].valor = tablaSim[a2].valor - tablaSim[a3].valor;
    }
    if (op === 'MULTIPLICAR') {
      tablaSim[a1].valor = tablaSim[a2].valor * tablaSim[a3].valor;
    }
    if (op === 'DIVIDIR') {
      tablaSim[a1].valor = tablaSim[a2].valor / tablaSim[a3].valor;
    }
    if (op === 'MAYOR') {
      tablaSim[a1].valor = tablaSim[a2].valor > tablaSim[a3].valor ? 1 : 0;
    }
    if (op === 'SALTARF') {
      if (tablaSim[a1].valor === 0) {
        i = a2 - 1;
      }
    }
  }
}

function esPalabraReservada(lexema) {
  switch (lexema.toUpperCase()) {
    case 'PROGRAMA':
      return 'PROGRAMA';
    case 'INICIO':
      return 'INICIO';
    case 'FIN':
      return 'FIN';
    case 'NUM':
      return 'NUM';
    case 'ASIGNAR':
      return 'ASIGNAR';
    case 'SUMAR':
      return 'SUMAR';
    case 'RESTAR':
      return 'RESTAR';
    case 'MULTIPLICAR':
      return 'MULTIPLICAR';
    case 'DIVIDIR':
      return 'DIVIDIR';
    case 'SI':
      return 'SI';
    case 'ENTONCES':
      return 'ENTONCES';
    case 'SINO':
      return 'SINO';
    default:
      return 'ID';
  }
}
%}

%token PROGRAMA ID INICIO FIN NUM ASIGNAR SUMAR RESTAR MULTIPLICAR DIVIDIR SI ENTONCES SINO MAYOR SALTARF

%%

S: PROGRAMA ID ';' INICIO listaInstr FIN '.'
  {
    imprimeTablaSim();
  }
  ;

listaInstr: instr listaInstr
  |
  ;

instr: SI cond ENTONCES bloque
  {
    const i = cx;
    generaCodigo('SALTARF', cond, '?', '-');
    $$ = i;
    tablaCod[$3].a2 = cx + 1;
  }
  | SINO bloque
  {
    const i = cx;
    generaCodigo('SALTAR', '?', '-', '-');
    $$ = i;
    tablaCod[$2].a2 = cx + 1;
  }
  | ID ':' '=' expr
  {
    generaCodigo('ASIGNAR', $1, $3, '-');
    $$ = $1;
  }
  | ID ':' '+' '=' expr
  {
    generaCodigo('SUMAR', $1, $4, '-');
    $$ = $1;
  }
  | ID ':' '-' '=' expr
  {
    generaCodigo('RESTAR', $1, $4, '-');
    $$ = $1;
  }
  | ID ':' '*' '=' expr
  {
    generaCodigo('MULTIPLICAR', $1, $4, '-');
    $$ = $1;
  }
  | ID ':' '/' '=' expr
  {
    generaCodigo('DIVIDIR', $1, $4, '-');
    $$ = $1;
  }
  ;

bloque: INICIO listaInstr FIN
  |
  instr
  ;

cond: expr '>' expr
  {
    const i = GenVarTemp();
    generaCodigo('MAYOR', i, $1, $3);
    $$ = i;
  }
  ;

expr: expr '+' term
  {
    const i = GenVarTemp();
    generaCodigo('SUMAR', i, $1, $3);
    $$ = i;
  }
  | expr '-' term
  {
    const i = GenVarTemp();
    generaCodigo('RESTAR', i, $1, $3);
    $$ = i;
  }
  | term
  ;

term: term '*' factor
  {
    const i = GenVarTemp();
    generaCodigo('MULTIPLICAR', i, $1, $3);
    $$ = i;
  }
  | term '/' factor
  {
    const i = GenVarTemp();
    generaCodigo('DIVIDIR', i, $1, $3);
    $$ = i;
  }
  | factor
  ;

factor: NUM
  {
    $$ = localizaSimb(lexema, 'NUM');
  }
  | ID
  {
    $$ = localizaSimb(lexema, 'ID');
  }
  ;

%%

function GenVarTemp() {
  const t = '_T' + nVarTemp++;
  return localizaSimb(t, 'ID');
}

function yylex() {
  let c = '';
  let i = 0;

  while (true) {
    c = getchar();
    if (c === ' ') continue;
    if (c === '\t') continue;
    if (c === '\n') continue;
    if (c === '') return '';

    if (isDigit(c)) {
      i = 0;
      do {
        lexema += c;
        c = getchar();
      } while (isDigit(c));
      ungetc(c);
      const num = parseFloat(lexema);
      lexema = '';
      return ['NUM', num];
    }

    if (isAlpha(c)) {
      i = 0;
      do {
        lexema += c;
        c = getchar();
      } while (isAlphaNum(c));
      ungetc(c);
      const token = esPalabraReservada(lexema);
      lexema = '';
      return [token, lexema];
    }

    return c;
  }
}

function isDigit(c) {
  return /[0-9]/.test(c);
}

function isAlpha(c) {
  return /[a-zA-Z]/.test(c);
}

function isAlphaNum(c) {
  return isAlpha(c) || isDigit(c);
}

function getchar() {
  // Implement your own getchar function here
}

function ungetc(c) {
  // Implement your own ungetc function here
}

const input = ''; // Provide your input here

const tokens = input.split(' ');
let tokenIndex = 0;

function lexer() {
  if (tokenIndex < tokens.length) {
    const token = tokens[tokenIndex];
    tokenIndex++;
    return token;
  }
  return '';
}

function parse() {
  if (yyparse()) {
    console.log('Cadena inválida');
  } else {
    console.log('Cadena válida');
  }
}

parse();

export default parse;