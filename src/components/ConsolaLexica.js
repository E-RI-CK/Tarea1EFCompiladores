import React from 'react';
import  parser  from '../bison/gramatica.jison';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ConsolaLexica = ({ codigo }) => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          <h4>TABLA DE SÍMBOLOS</h4>
        </div>
      </Box>
      <div>
        <div style={{ margin: 50 }}>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table
              sx={{ minWidth: 800 }}
              size="small"
              aria-label="a dense table"
              parser={parser}
            >
              <TableHead style={{ backgroundColor: '##AFAEAE' }}>
                <TableRow>
                  <TableCell>Lexema</TableCell>
                  <TableCell align="left">Token</TableCell>
                  <TableCell align="left">Código</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {codigo.length
                  ? codigo.map(({ Nombre, Tipo, Token }, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {Nombre}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {Tipo}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {Token}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ConsolaLexica;
