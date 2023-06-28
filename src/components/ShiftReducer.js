import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

// import './ShiftComponents/table';
// import './ShiftComponents/tablegen';
// import './ShiftComponents/tokenizer';
// import './ShiftComponents/astdraw';
// import './ShiftComponents/parser';
// import './ShiftComponents/demotable';
// import './ShiftComponents/logger';

const useStyles = makeStyles({
    root: {
      textAlign: 'center',
      backgroundColor: '#444',
      color: 'white',
      fontFamily: 'sans-serif',
    },
    container: {
      padding: '4rem 3rem',
      margin: 'auto',
      maxWidth: '800px',
    },
    header: {
      marginBottom: '2rem',
    },
    nameBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      '& .name-text': {
        marginRight: '1rem',
      },
      '& .edit-hint': {
        cursor: 'pointer',
      },
    },
    runningControls: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
      '& button': {
        marginRight: '1rem',
      },
    },
    idleControls: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
      '& button': {
        marginRight: '1rem',
      },
    },
    sidebar: {
      flex: '0 0 50%',
      marginRight: '2rem',
      '& .grammar-container': {
        marginBottom: '3rem',
        '& .input-box': {
          width: '100%',
        },
        '& .grammar-edit-controls': {
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
          '& .input-box': {
            marginRight: '1rem',
          },
          '& button': {
            marginLeft: '1rem',
          },
        },
      },
      '& .input-container': {
        marginBottom: '3rem',
        '& .input-box': {
          width: '100%',
        },
      },
    },
    rightContent: {
      flex: '1 1 50%',
    },
    stackContainer: {
      marginBottom: '3rem',
      '& .stack-label': {
        marginRight: '1rem',
      },
    },
    tokensContainer: {
      marginBottom: '3rem',
      '& .stack-label': {
        marginRight: '1rem',
      },
    },
    tableContainer: {
      position: 'relative',
      marginBottom: '3rem',
      '& table': {
        width: '100%',
        marginBottom: '1rem',
      },
      '& .ast-expand-collapse': {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        cursor: 'pointer',
        '& .ast-icon': {
          marginLeft: '0.5rem',
        },
      },
      '& .ast-modal': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        pointerEvents: 'none',
        '& .ast-modal-canvas': {
          maxWidth: '100%',
          maxHeight: '100%',
        },
      },
    },
    footer: {
      marginTop: '1rem',
    },
    outputLog: {
      width: '100%',
    },
    disabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  });


const ShiftReducer = () => {
    const classes = useStyles();
    const [grammar, setGrammar] = useState('E -> E + T\nE -> T\nT -> T * F\nT -> F\nF -> ( E )\nF -> id');
    const [inputText, setInputText] = useState('id + id * id$');
  
    const handleGrammarChange = (e) => {
      setGrammar(e.target.value);
    };
  
    const handleInputTextChange = (e) => {
      setInputText(e.target.value);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <h1 className={classes.header}>Shift Reduce Parser</h1>
          <div className={classes.nameBar}>
            <input type="text" className="name-text" />
            <span className="edit-hint material-icons">edit</span>
          </div>
          <div className={classes.runningControls}>
            <button type="button" className="btn btn-secondary" id="prev-btn">
              Previous
            </button>
            <button type="button" className="btn btn-primary" id="next-btn">
              Next
            </button>
            <button type="button" className="btn btn-danger" id="stop-btn">
              Stop
            </button>
          </div>
          <div className={classes.idleControls}>
            <button type="button" className="btn btn-primary" id="import-btn">
              Import
            </button>
            <button type="button" className="btn btn-info" id="export-btn">
              Export
            </button>
            <button type="button" className="btn btn-success" id="run-btn">
              Run
            </button>
          </div>
        </div>
  
        <div className={`${classes.container} ${classes.rightContent}`}>
          <div className="state-content">
            <div className={`${classes.stackContainer} ${classes.disabled}`}>
              <span className="stack-label">Stack:</span>
              <div className="stack-list"></div>
            </div>
            <div className={`${classes.tokensContainer} ${classes.disabled}`}>
              <span className="stack-label">Tokens:</span>
              <div className="tokens-list"></div>
            </div>
          </div>
          <div className={classes.tableContainer}>
            <table className="parser-table table-dark"></table>
            <div className="ast-expand-collapse" id="ast-expand">
              <span className="ast-text">Show AST</span>
              <span className="ast-icon material-icons">expand_more</span>
            </div>
            <div className={`${classes.astExpandCollapse} ${classes.disabled}`} id="ast-collapse">
              <span className="ast-text">Hide AST</span>
              <span className="ast-icon material-icons">expand_less</span>
            </div>
            <div className={`${classes.astModal} ${classes.astModalDisabled}`}>
              <canvas className="ast-modal-canvas" id="ast-canvas"></canvas>
            </div>
          </div>
        </div>
  
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <div className={`${classes.grammarContainer} mb-3`}>
              <h2 className="mb-2">Grammar</h2>
              <div className={`${classes.grammarEditControls}`}>
                <textarea
                  className="input-box mb-2"
                  id="grammar-input"
                  cols="40"
                  rows="5"
                  value={grammar}
                  onChange={handleGrammarChange}
                ></textarea>
                <button type="button" className="btn btn-primary" id="tablegen-btn">
                  Generate Table
                </button>
              </div>
              <div className={`${classes.grammarRuleList} ${classes.disabled}`}></div>
            </div>
            <div className={`${classes.inputContainer}`}>
              <h2 className="mb-2">Input</h2>
              <textarea
                className="input-box"
                id="text-input"
                cols="40"
                rows="5"
                value={inputText}
                onChange={handleInputTextChange}
              ></textarea>
            </div>
          </div>
          <div className={`${classes.rightContent}`}>
            <div className="state-content">
              <div className={`${classes.stackContainer} ${classes.disabled}`}>
                <span className="stack-label">Stack:</span>
                <div className="stack-list"></div>
              </div>
              <div className={`${classes.tokensContainer} ${classes.disabled}`}>
                <span className="stack-label">Tokens:</span>
                <div className="tokens-list"></div>
              </div>
            </div>
            <div className={`${classes.tableContainer}`}>
              <table className="parser-table table-dark"></table>
              <div className="ast-expand-collapse" id="ast-expand">
                <span className="ast-text">Show AST</span>
                <span className="ast-icon material-icons">expand_more</span>
              </div>
              <div className={`${classes.astExpandCollapse} ${classes.disabled}`} id="ast-collapse">
                <span className="ast-text">Hide AST</span>
                <span className="ast-icon material-icons">expand_less</span>
              </div>
              <div className={`${classes.astModal} ${classes.astModalDisabled}`}>
                <canvas className="ast-modal-canvas" id="ast-canvas"></canvas>
              </div>
            </div>
          </div>
        </div>
  
        <div className={classes.container}>
          <textarea className={classes.outputLog} cols="40" rows="5" readOnly={true}></textarea>
        </div>
      </div>
    );
  }

export default ShiftReducer;
