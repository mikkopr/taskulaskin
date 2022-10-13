
import { useState } from 'react';
import './Calculator.css';

import CalcButton from './CalcButton';

const calcButtons = ['1','2','3','C','4','5','6','+','7','8','9','-','.','0','%','x'];
const extraButtons = ['sin', 'cos', '?'];

const Calculator = (props) => {
  const [output, setOutput] = useState('');
  const [enabledExtraButtons, setEnabledExtraButtons] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState(props.backColor);

  /****************************
   * Calculator functions
   */

  /***
   * Evaluates the given expression and returns the result.
   */
  const calculateResult = (expr) => {
    if (!checkExpression(expr))
      return 'undefined';
    changeBackgroundColor();
    return eval(expr);
  }

  const calculateMultiply = (expr) => {
    return expr + '*';
  }

  const calculateDivide = (expr) => {
    return expr + '/';
  }

  const calculateCos = (expr) => {
    const expressionValue = eval(expr);
    if (isFinite(expressionValue))
      return Math.cos(expressionValue);
    else
      return 'undefined';
  }

  const calculateSin = (expr) => {
    const expressionValue = eval(expr);
    if (isFinite(expressionValue))
      return Math.sin(expressionValue);
    else
      return 'undefined';
  }

  /***
   * Return a random number between 0 and x
   */
  const calculateRandom = (expr) => {
    const expressionValue = eval(expr);
    if (isFinite(expressionValue))
      return Math.floor(Math.random() * expressionValue);
    else
      return 'undefined';
  }

  const clear = () => '';

  const calcFunctions = {
    '=': calculateResult,
    'x': calculateMultiply,
    '%': calculateDivide,
    'sin': calculateSin,
    'cos': calculateCos,
    '?' : calculateRandom,
    'C': clear
  };

  const checkExpression = (expr) => true;

  const changeBackgroundColor = () => {
    const INT_24_MAX = 2**24;
    const colorValue = Math.floor(Math.random() * INT_24_MAX);
    //Hex colors have six symbols, so pad with zeroes
    const colorValueAsHex = colorValue.toString(16).padStart(6, '0');
    //console.log("BackColor:" + colorValueAsHex);
    setBackgroundColor('#' + colorValueAsHex);
  }

  /************************
   * Event handlers
   */

  const calcButtonPressed = (x) => 
  {
    if (calcFunctions[x] !== undefined) {
      setOutput(calcFunctions[x](output));
      return;
    }
    setOutput(output + x);
  };
  
  const toggleExtraButtons = () => {
    if (enabledExtraButtons.length === 0) {
      setEnabledExtraButtons(extraButtons);
    }
    else {
      setEnabledExtraButtons([]);
    }
  };

  const calculatorStyle = {'background-color': backgroundColor};
  
  return (
    <div className='calculator' style={calculatorStyle}>
      <div className='calc-display'>{output}</div>
      <div className='calc-grid'>
        {calcButtons.map( (calcButton, index) => {
          return <CalcButton
            key={index}
            className='calc-button'
            calcButton={calcButton}
            calcButtonPressed={calcButtonPressed} />
          } )}
        {<CalcButton
          className='result-button'
          calcButton='='
          calcButtonPressed={calculateResult}/>}
        {<CalcButton
          className='toggle-button'
          calcButton='E'
          calcButtonPressed={toggleExtraButtons}/>}
        {enabledExtraButtons.map( (extraButton, index) => {
          return <CalcButton
            key={'E' + index}
            className='extra-button'
            calcButton={extraButton}
            calcButtonPressed={calcButtonPressed} />
          } )}
        </div>
    </div>
  );
};

export default Calculator;
