const getIdentifierCodigoIntermedio = (code) => {
  if (!code) {
    return '';
  }
  let getCodeCad = [];
  let Ident = /[a-zA-Z_]\w*/g;
  let Nums = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g;
  let Oper1 = /([-+*/=()&|;:.,<>{}[\]])/g; // May be some character is missing?

  let identificador = '';
  let numero = '';
  const getCode = code.match(/[^\r\n]+/g);
  let textErrors = '';

  const parse = {
    declarar: 'function ',
    iniciar: ' {\n',
    terminar: '}\n',
    constante: 'const ',
    ':': ' = ',
    ',': ',',
    ';':';\n',
    variable: 'let ',
    si: 'if',
    sino: 'else',
    sinoa: 'else if',
    imprimir: 'console.log(',
    para: 'for',
    '"': '"',
    retornar: "return ",
    " ":" ",
  };

  // Separar en token cada linea de codigo
  for (let codeI = 0; codeI < getCode.length; codeI++) {
    let getValueText = getCode[codeI];
    let tempArray = [];

    for (let codeF = 0; codeF < getValueText.length; codeF++) {
      let getChar = getValueText.charAt(codeF);

      if (getChar.match(Ident)) {
        identificador = identificador + getChar;

        if (!getValueText.charAt(codeF + 1).match(Ident)) {
          tempArray = [...tempArray, identificador];
          identificador = '';
        }
      } else if (getChar.match(Oper1)) {
        tempArray = [...tempArray, getChar];
      } else if (getChar.match(Nums)) {
        numero = numero + getChar;

        if (!getValueText.charAt(codeF + 1).match(Nums)) {
          tempArray = [...tempArray, numero];
          numero = '';
        }
      }
    }
    getCodeCad = [...getCodeCad, tempArray];
  }

  for (let i = 0; i < getCodeCad.length; i++) {
    if (getCodeCad[i].includes('print')) {
      textErrors += `${parse['print']} ${getCodeCad[i]
        .slice(1, getCodeCad[i].length)
        .join(' ')} );\n`;
    } else {
      for (let f = 0; f < getCodeCad[i].length; f++) {
        if (parse.hasOwnProperty(getCodeCad[i][f])) {
          textErrors += `${parse[getCodeCad[i][f]]}`;
        } else {
          textErrors += `${getCodeCad[i][f]}`;
        }
      }
    }
  }

  return textErrors;
};

export default getIdentifierCodigoIntermedio;




