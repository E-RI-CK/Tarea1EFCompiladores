// const getIdentifierSemantico = (code) => {
//   if (!code) {
//     return '';
//   }
//   let getCodeCad = [];
//   let Ident = /[a-zA-Z_]\w*/g;
//   let Nums = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g;
//   let Oper1 = /([-+*/=()&|;:.,<>{}[\]])/g; // May be some character is missing?

//   const regxIsOpe =
//     /^[a-zA-Z]+ = ([a-zA-Z]+|[0-9]+) (-|\+|\/|\*) ([a-zA-Z]+|[0-9]+)/g;

//   const regxInt = /[0-9]+/g;
//   const regxBool = /(true|false)/g;
//   const regxString = /[a-zA-Z]+/g;

//   let identificador = '';
//   let numero = '';
//   const getCode = code.match(/[^\r\n]+/g);
//   let textErrors = '';

//   const variables = {
//     int: {},
//     string: {},
//     bool: {},
//   };

//   Separar en token cada linea de codigo
//   for (let codeI = 0; codeI < getCode.length; codeI++) {
//     let getValueText = getCode[codeI];
//     let tempArray = [];

//     for (let codeF = 0; codeF < getValueText.length; codeF++) {
//       let getChar = getValueText.charAt(codeF);

//       if (getChar.match(Ident)) {
//         identificador = identificador + getChar;

//         if (!getValueText.charAt(codeF + 1).match(Ident)) {
//           tempArray = [...tempArray, identificador];
//           identificador = '';
//         }
//       } else if (getChar.match(Oper1)) {
//         tempArray = [...tempArray, getChar];
//       } else if (getChar.match(Nums)) {
//         numero = numero + getChar;

//         if (!getValueText.charAt(codeF + 1).match(Nums)) {
//           tempArray = [...tempArray, numero];
//           numero = '';
//         }
//       }
//     }
//     getCodeCad = [...getCodeCad, tempArray];
//   }

//   for (let i = 0; i < getCodeCad.length; i++) {
//     const cont = i + 1;
//     if (
//       getCodeCad[i].includes('const') ||
//       getCodeCad[i].includes('let') ||
//       getCodeCad[i].includes('var')
//     ) {
//       if (getCodeCad[i].length === 5) {
//         if (getCodeCad[i][3].match(regxInt)) {
//           variables['int'] = {
//             ...variables['int'],
//             [getCodeCad[i][1]]: getCodeCad[i][3],
//           };
//         }
//         if (
//           getCodeCad[i][3].match(regxString) &&
//           getCodeCad[i][3] !== 'true' &&
//           getCodeCad[i][3] !== 'false'
//         ) {
//           variables['string'] = {
//             ...variables['string'],
//             [getCodeCad[i][1]]: getCodeCad[i][3],
//           };
//         }
//         if (getCodeCad[i][3].match(regxBool)) {
//           variables['bool'] = {
//             ...variables['bool'],
//             [getCodeCad[i][1]]: getCodeCad[i][3],
//           };
//         }
//       }
//     }
//     if (getCode[i].match(regxIsOpe)) {
//       let operacionName = '';
//       switch (getCodeCad[i][3]) {
//         case '+':
//           operacionName = 'sumar';
//           break;
//         case '-':
//           operacionName = 'restar';
//           break;
//         case '*':
//           operacionName = 'multiplicar';
//           break;
//         case '/':
//           operacionName = 'dividir';
//           break;
//         default:
//           operacionName = '';
//       }

//       OPERACIONES

//       if (['+', '-', '*', '/'].includes(getCodeCad[i][3])) {
//         if (
//           getCodeCad[i][2].match(regxInt) &&
//           getCodeCad[i][4].match(regxInt)
//         ) {
//         } else if (getCodeCad[i][2].match(regxInt)) {
//           if (!variables['int'].hasOwnProperty([getCodeCad[i][4]])) {
//             if (!verificarVariable(getCodeCad[i][4], variables)) {
//               textErrors += `Error linea ${cont}, La variable ${getCodeCad[i][4]} no esta declarada.\n`;
//             }
//             textErrors += `Error linea ${cont}, No puede ${operacionName} "${getCodeCad[i][2]}" con "${getCodeCad[i][4]}"\n`;
//           }
//         } else if (getCodeCad[i][4].match(regxInt)) {
//           if (!variables['int'].hasOwnProperty([getCodeCad[i][2]])) {
//             if (!verificarVariable(getCodeCad[i][2], variables)) {
//               textErrors += `Error linea ${cont}, La variable ${getCodeCad[i][2]} no esta declarada.\n`;
//             }
//             textErrors += `Error linea ${cont}, No puede ${operacionName} "${getCodeCad[i][2]}" con "${getCodeCad[i][4]}"\n`;
//           }
//         } else {
//           if (
//             verificarVariable(getCodeCad[i][2], variables) &&
//             verificarVariable(getCodeCad[i][4], variables)
//           ) {
//             if (
//               variables['string'].hasOwnProperty([getCodeCad[i][2]]) &&
//               variables['string'].hasOwnProperty([getCodeCad[i][4]]) &&
//               getCodeCad[i][3] !== '+'
//             ) {
//               textErrors += `Error linea ${cont}, No puede ${operacionName} "${getCodeCad[i][2]}" con "${getCodeCad[i][4]}", ambos son String.\n`;
//             } else if (
//               !variables['int'].hasOwnProperty([getCodeCad[i][2]]) ||
//               !variables['int'].hasOwnProperty([getCodeCad[i][4]])
//             ) {
//               textErrors += `Error linea ${cont}, No puede ${operacionName} "${getCodeCad[i][2]}" con "${getCodeCad[i][4]}"\n`;
//             }
//           }

//           if (!verificarVariable(getCodeCad[i][2], variables)) {
//             textErrors += `Error linea ${cont}, La variable "${getCodeCad[i][4]}" no esta declarada.\n`;
//           }
//           if (!verificarVariable(getCodeCad[i][4], variables)) {
//             textErrors += `Error linea ${cont}, La variable "${getCodeCad[i][4]}" no esta declarada.\n`;
//           }
//         }
//       }
//     }
//   }

//   return textErrors;
// };

// const verificarVariable = (name, variables) => {
//   let isCorrect = false;

//   Object.keys(variables).forEach((value) => {
//     if (variables[value][name]) {
//       isCorrect = true;
//     }
//   });

//   return isCorrect;
// };

// export default getIdentifierSemantico;


/////////////////////////////////////////////////////////////////////
const getIdentifierSemantico = (code) => {
  if (!code) {
    return '';
  }
  let getCodeCad = [];
  let Ident = /[a-zA-Z_]\w*/g;
  let Nums = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g;
  let Oper1 = /([-+*/=()&|;:.,<>{}[\]])/g; // May be some character is missing?

  const regxIsOpe =
    /^[a-zA-Z]+ = ([a-zA-Z]+|[0-9]+) (-|\+|\/|\*) ([a-zA-Z]+|[0-9]+)/g;

  const regxInt = /[0-9]+/g;
  const regxBool = /(true|false)/g;
  const regxString = /[a-zA-Z]+/g;

  let identificador = '';
  let numero = '';
  const getCode = code.match(/[^\r\n]+/g);
  let textErrors = '';

  const variables = {
    int: {},
    string: {},
    bool: {},
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
    const cont = i + 1;
    if (
      getCodeCad[i].includes('const') ||
      getCodeCad[i].includes('let') ||
      getCodeCad[i].includes('var')
    ) {
      if (getCodeCad[i].length === 5) {
        if (getCodeCad[i][3].match(regxInt)) {
          variables['int'] = {
            ...variables['int'],
            [getCodeCad[i][1]]: getCodeCad[i][3],
          };
        }
        if (
          getCodeCad[i][3].match(regxString) &&
          getCodeCad[i][3] !== 'true' &&
          getCodeCad[i][3] !== 'false'
        ) {
          variables['string'] = {
            ...variables['string'],
            [getCodeCad[i][1]]: getCodeCad[i][3],
          };
        }
        if (getCodeCad[i][3].match(regxBool)) {
          variables['bool'] = {
            ...variables['bool'],
            [getCodeCad[i][1]]: getCodeCad[i][3],
          };
        }
      }
    }
    if (getCode[i].match(regxIsOpe)) {
      let operacionName = '';
      switch (getCodeCad[i][3]) {
        case '+':
          operacionName = 'sumar';
          break;
        case '-':
          operacionName = 'restar';
          break;
        case '*':
          operacionName = 'multiplicar';
          break;
        case '/':
          operacionName = 'dividir';
          break;
        default:
          operacionName = '';
      }

      // OPERACIONES

      if (['+', '-', '*', '/'].includes(getCodeCad[i][3])) {
        if (
          getCodeCad[i][2].match(regxInt) &&
          getCodeCad[i][4].match(regxInt)
        ) {
        } else if (getCodeCad[i][2].match(regxInt)) {
          if (!variables['int'].hasOwnProperty([getCodeCad[i][4]])) {
            if (!verificarVariable(getCodeCad[i][4], variables)) {
              textErrors += `Error linea ${cont}, La variable ${getCodeCad[i][4]} no esta declarada.\n`;
            }
            textErrors += `Error linea ${cont}, No puede ${operacionName} "${getCodeCad[i][2]}" con "${getCodeCad[i][4]}"\n`;
          }
        } else if (getCodeCad[i][4].match(regxInt)) {
          if (!variables['int'].hasOwnProperty([getCodeCad[i][2]])) {
            if (!verificarVariable(getCodeCad[i][2], variables)) {
              textErrors += `Error linea ${cont}, La variable ${getCodeCad[i][2]} no esta declarada.\n`;
            }
            textErrors += `Error linea ${cont}, No puede ${operacionName} "${getCodeCad[i][2]}" con "${getCodeCad[i][4]}"\n`;
          }
        } else {
          if (
            verificarVariable(getCodeCad[i][2], variables) &&
            verificarVariable(getCodeCad[i][4], variables)
          ) {
            if (
              variables['string'].hasOwnProperty([getCodeCad[i][2]]) &&
              variables['string'].hasOwnProperty([getCodeCad[i][4]]) &&
              getCodeCad[i][3] !== '+'
            ) {
              textErrors += `Error linea ${cont}, No puede ${operacionName} "${getCodeCad[i][2]}" con "${getCodeCad[i][4]}", ambos son String.\n`;
            } else if (
              !variables['int'].hasOwnProperty([getCodeCad[i][2]]) ||
              !variables['int'].hasOwnProperty([getCodeCad[i][4]])
            ) {
              textErrors += `Error linea ${cont}, No puede ${operacionName} "${getCodeCad[i][2]}" con "${getCodeCad[i][4]}"\n`;
            }
          }

          if (!verificarVariable(getCodeCad[i][2], variables)) {
            textErrors += `Error linea ${cont}, La variable "${getCodeCad[i][4]}" no esta declarada.\n`;
          }
          if (!verificarVariable(getCodeCad[i][4], variables)) {
            textErrors += `Error linea ${cont}, La variable "${getCodeCad[i][4]}" no esta declarada.\n`;
          }
        }
      }
    }
  }

  return textErrors;
};

const verificarVariable = (name, variables) => {
  let isCorrect = false;

  Object.keys(variables).forEach((value) => {
    if (variables[value][name]) {
      isCorrect = true;
    }
  });

  return isCorrect;
};

export default getIdentifierSemantico;