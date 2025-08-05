import React, { useState } from 'react';
import { Button, Input, Layout, Row, Col, Typography } from 'antd';
import './Calculator.css';

const { Content } = Layout;
const { Title } = Typography;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    setWaitingForSecondValue(false);
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const calculateResult = () => {
    if (!previousValue || !operation) return;

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
        if (currentValue === 0) {
          setDisplay('Ошибка');
          return;
        }
        result = previousValue / currentValue;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleDelete = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C', '⌫'
  ];

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
      <Content style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Калькулятор</Title>
        <Input
          value={display}
          disabled
          style={{ marginBottom: '10px', textAlign: 'right', fontSize: '24px', height: '60px', borderRadius: '8px' }}
        />
        <Row gutter={[8, 8]}>
          {buttons.map((btn) => (
            <Col span={6} key={btn}>
              <Button
                type={['+', '-', '*', '/'].includes(btn) ? 'primary' : 'default'}
                danger={btn === 'C' || btn === '⌫'}
                style={{ width: '100%', height: '60px', fontSize: '20px', borderRadius: '8px' }}
                onClick={() => {
                  if (btn === '=') {
                    calculateResult();
                  } else if (btn === 'C') {
                    handleClear();
                  } else if (btn === '⌫') {
                    handleDelete();
                  } else if (['+', '-', '*', '/'].includes(btn)) {
                    handleOperationClick(btn);
                  } else {
                    handleNumberClick(btn);
                  }
                }}
              >
                {btn}
              </Button>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default Calculator;
