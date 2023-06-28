import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import ConsolaSintactica from '../components/ConsolaSintactica';
import Form from '../components/Form';
import ConsolaCodigoIntermedio from '../components/ConsolaCodigoIntermedio';
import ConsolaLexica from '../components/ConsolaLexica';
// import ConsolaSemantica from '../components/ConsolaSemantica';
// import FormSemantico from '../components/FormSemantico';
// import ShiftReducer from '../components/ShiftReducer';

const AnalizadorSintactico = () => {
  const [data, setData] = useState('');
  const [dataConvert, setDataConvert] = useState('');
  const [dataConvertLexico, setDataConvertLexico] = useState('');
  const [dataConvertSemantica, setDataConvertSemantica] = useState('');
  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{ margin: 20, paddingBottom: 30 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Form
              setData={setData}
              setDataConvert={setDataConvert}
              setDataConvertLexico={setDataConvertLexico}
            />
          </Grid>
          <Grid item xs={4}>
            <ConsolaCodigoIntermedio codigo={data} />
          </Grid>
          <Grid item xs={8}>
            <ConsolaLexica codigo={dataConvertLexico} />
          </Grid>
          <Grid item xs={4}>
            <ConsolaSintactica codigo={eval(data)} />
          </Grid>
           {/* <Grid item xs={8}>
            <FormSemantico setDataConvertSemantica={setDataConvertSemantica} />
          </Grid> */}
          {/* <Grid item xs={4}>
             <ConsolaSemantica codigo={dataConvertSemantica} /> 
            <ConsolaSemantica codigo={dataConvert} />
          </Grid> */}
        </Grid>
      </Box>
      {/* <ShiftReducer/> */}
    </>
  );
};
export default AnalizadorSintactico;
