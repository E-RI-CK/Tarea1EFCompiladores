import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import getIdentifier from '../helpers/getIdentifier';
import getIdentifierCodigoIntermedio from '../helpers/getIdentifierCodigoIntermedio';
import getIdentifierLexico from '../helpers/getIdentifierLexico';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    paddingLeft: 5,
  },
  container: {
    paddingTop: 5,
    display: 'flex',
  },
  inputText: {
    width: '100%',
  },
}));

const Form = ({ setData, setDataConvert, setDataConvertLexico }) => {
  const classes = useStyles();
  const [codigo, setCodigo] = useState('');

  const getResult = () => {
    const convertCode = getIdentifierCodigoIntermedio(codigo);
    setData(convertCode);
    setDataConvert(getIdentifier(convertCode));
    setDataConvertLexico(getIdentifierLexico(convertCode));
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          <h1 style={{ textTransform: 'uppercase' }}>Compilador</h1>
          <div className={classes.container}>
            <span className={classes.title}>Autor:</span>
            <span className={classes.text}>
              Andro Erick Valero Medina
            </span>
          </div>
          <div className={classes.container}>
            <span className={classes.title}>Lenguaje:</span>
            <span className={classes.text}>JavaScript</span>
          </div>
        </div>
      </Box>
      <div style={{ margin: 50 }}>
        <div>
          <TextField
            id="outlined-multiline-static"
            className={classes.inputText}
            label="Escribe o pega el código a analizar"
            multiline
            rows={11}
            defaultValue={codigo}
            onChange={({ target: { value } }) => setCodigo(value)}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <Button variant="contained" onClick={getResult}>
            Analizar
          </Button>
        </div>
      </div>
    </>
  );
};

export default Form;
