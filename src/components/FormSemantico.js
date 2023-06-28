import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import getIdentifierSemantico from '../helpers/getIdentifierSemantico';

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

const FormSemantico = ({ setDataConvertSemantica }) => {
  const classes = useStyles();
  const [codigo, setCodigo] = useState('');

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          <h3 style={{ textTransform: 'uppercase' }}>analizador semantico</h3>
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
          <Button
            variant="contained"
            onClick={() =>
              setDataConvertSemantica(getIdentifierSemantico(codigo))
            }
          >
            Analizar
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormSemantico;
