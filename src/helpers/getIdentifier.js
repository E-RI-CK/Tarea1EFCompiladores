const getIdentifier = (code) => {
  if (!code) {
    return '';
  }
  let getCodeCad = [];
  let Ident = /[a-zA-Z_]\w*/g;
  let Nums = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g;
  let Oper1 = /([-+*/=()&|;:.,<>{}[\]])/g; // May be some character is missing?

  const regxConst = /const ([a-zA-Z]+)( = )([0-9]+)(;)$/g;
  const regxLetOrVar = /(var|let) ([a-zA-Z]+)(;|(( = )([0-9]+);))$/g;
  const regxFunction = /function ([a-zA-Z]+)((\(\))|(\([a-zA-Z]+\))) {$/g;
  const regxIf = /if\(.+\) {$/g;
  const regxElse = /} else {$/g;
  const regxConsole = /console.log\( .+ \);$/g;
  const regxWhile = /while \(.+\) {$/g;

  let identificador = '';
  let numero = '';
  const getCode = code.match(/[^\r\n]+/g);
  let textErrors = '';

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

  let llavesD = 0;
  let llavesI = 0;

  for (let i = 0; i < getCodeCad.length; i++) {
    const cont = i + 1;
    // Si son variables
    if (getCodeCad[i].includes('const')) {
      if (!getCode[i].match(regxConst)) {
        textErrors += `Error linea ${cont}, solucion: const ${
          getCodeCad[i][1] ? getCodeCad[i][1] : 'name'
        } = ${getCodeCad[i][3]?.match(Nums) ? getCodeCad[i][3] : 0};\n`;
      }
    }
    if (getCodeCad[i].includes('let') || getCodeCad[i].includes('var')) {
      if (!getCode[i].match(regxLetOrVar)) {
        if (getCodeCad[i].length === 3) {
          textErrors += `Error linea ${cont}, solucion: ${getCodeCad[i][0]} ${
            getCodeCad[i][1] ? getCodeCad[i][1] : 'name'
          };\n`;
        } else {
          textErrors += `Error linea ${cont}, solucion: ${getCodeCad[i][0]} ${
            getCodeCad[i][1] ? getCodeCad[i][1] : 'name'
          } = ${getCodeCad[i][3]?.match(Nums) ? getCodeCad[i][3] : 0};\n`;
        }
      }
    }

    // Si es una function
    // if (getCodeCad[i].includes('function')) {
    //   if (!getCode[i].match(regxFunction)) {
    //     textErrors += `Error linea ${cont}, solucion: function ${
    //       getCodeCad[i][1] ? getCodeCad[i][1] : 'name'
    //     } (${getCodeCad[i][3]?.match(Ident) ? getCodeCad[i][3] : 'param'}) {\n`;
    //   }
    // }

    //Si es in if
    if (getCodeCad[i].includes('if')) {
      if (!getCode[i].match(regxIf)) {
        textErrors += `Error linea ${cont}, solucion: if (true) {\n`;
      }
    }

    //Si es in else
    if (getCodeCad[i].includes('else')) {
      if (!getCode[i].match(regxElse)) {
        textErrors += `Error linea ${cont}, solucion: else {\n`;
      }
    }

    // Si es un console.log
    // if (getCodeCad[i].includes('console')) {
    //   console.log(getCodeCad[i],getCode[i] )
    //   if (!getCode[i].match(regxConsole)) {
    //     textErrors += `Error linea ${cont}, solucion: console.log(value);\n`;
    //   }
    // }

    // Si es un while
    if (getCodeCad[i].includes('while')) {
      if (!getCode[i].match(regxWhile)) {
        textErrors += `Error linea ${cont}, solucion: while (true) {\n`;
      }
    }

    //Cantidad de llaves
    if (getCodeCad[i].includes('{')) {
      llavesI += 1;
    }
    if (getCodeCad[i].includes('}')) {
      llavesD += 1;
    }
  }

  if (llavesI > llavesD) {
    textErrors += `Error, faltan ${llavesI - llavesD}  '}'  de cierre.\n`;
  } else if (llavesD > llavesI) {
    textErrors += `Error, faltan ${llavesD - llavesI}  '{'  de apertura.\n`;
  }

  return textErrors;
};

export default getIdentifier;
