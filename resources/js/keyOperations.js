// Select all necessary DOM elements for calculator functionality
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const output = document.querySelector('.output');
const clearBtn = document.querySelector('[id=ac]');
const eraseBtn = document.querySelector('[id=erase]');
const equalBtn = document.querySelector('[id=equals]');
const posNegBtn = document.querySelector('[id=pos-neg]')
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
const displayOperator = document.querySelector('.display-operator');

// Export all selected elements for use in other modules
export { numberBtn, operatorBtn, output, clearBtn, eraseBtn, equalBtn, posNegBtn, currentOperand, previousOperand, displayOperator };