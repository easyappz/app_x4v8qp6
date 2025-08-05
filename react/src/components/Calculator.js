import React, { useState } from 'react';
import { Button, Input, Layout, Typography } from 'antd';
import './Calculator.css';

const { Content } = Layout;
const { Title } = Typography;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [previousValue, setPreviousValue] = useState(0);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperationClick = (op) => {
    setOperation(op);
    setPreviousValue(parseFloat(display));
    setDisplay('0');
    setWaitingForSecondValue(true);
  };

  const handleEqualClick = () => {
    if (!operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '*':
        result = previousValue * currentValue;
        break;
      case '/':
        result = previousValue / currentValue;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setOperation('');
    setPreviousValue(0);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setOperation('');
    setPreviousValue(0);
    setWaitingForSecondValue(false);
  };

  return (
    <Layout style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div className="calculator-container">
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Калькулятор</Title>
          <Input
            value={display}
            disabled
            style={{ marginBottom: '20px', textAlign: 'right', fontSize: '24px', height: '50px' }}
          />
          <div className="calculator-buttons">
            <Button className="calc-button" onClick={() => handleClearClick()}>C</Button>
            <Button className="calc-button" onClick={() => handleOperationClick('/')}>/</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('7')}>7</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('8')}>8</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('9')}>9</Button>
            <Button className="calc-button" onClick={() => handleOperationClick('*')}>×</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('4')}>4</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('5')}>5</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('6')}>6</Button>
            <Button className="calc-button" onClick={() => handleOperationClick('-')}>-</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('1')}>1</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('2')}>2</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('3')}>3</Button>
            <Button className="calc-button" onClick={() => handleOperationClick('+')}>+</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('0')}>0</Button>
            <Button className="calc-button" onClick={() => handleNumberClick('.')}>.</Button>
            <Button className="calc-button equal-button" onClick={() => handleEqualClick()}>=</Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Calculator;
