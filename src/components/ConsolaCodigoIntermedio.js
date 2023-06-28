import React from 'react';
import { Box, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import  parse  from '../bison/gramatica.jison';

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
    color: 'red',
  },
}));

const ConsolaCodigoIntermedio = ({ codigo }) => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          <h4>CONSOLA CODIGO INTERMEDIO</h4>
        </div>
      </Box>
        <div>
          <div style={{ paddingTop: 17}}>
            <TextField
              id="outlined-multiline-static"
              className={classes.inputText}
              multiline
              rows={16}
              disabled={true}
              defaultValue={codigo}
              parse={parse}
            />
          </div>
        </div>
    </>
  );
};
export default ConsolaCodigoIntermedio;
