import { operate, handleNumberInput, isValidNumber, formatNumberForDisplay, toggleSign } from './mathOperations.js';
import * as keyOperations from './keyOperations.js';
import { handleKeyboardInput } from './keyboardInput.js';


// Initialize calculator state
let currentOperand = '';
let previousOperand = '';
let operator = null;
let awaitingNextInput = false;

// Update the calculator display
function updateDisplay() {
    keyOperations.currentOperand.textContent = currentOperand || '';  
    keyOperations.previousOperand.textContent = previousOperand || '';  

    // Display or clear the operator based on current state
    if (operator === null || operator === '+/-') {
        keyOperations.displayOperator.textContent = '';
    } else {
        keyOperations.displayOperator.textContent = operator;
    }
}

// Perform calculation based on current state
function performCalculation() {
    if (operator && isValidNumber(previousOperand) && isValidNumber(currentOperand)) {
        const result = operate(operator, parseFloat(previousOperand), parseFloat(currentOperand));
        currentOperand = result.toString();
        previousOperand = '';
        operator = null;
        awaitingNextInput = true;
        updateDisplay();
    }
}

// Set up keyboard input handling
handleKeyboardInput(
    // Number input handler
    (input) => {
        if (awaitingNextInput) {
            currentOperand = handleNumberInput(previousOperand, '', input);
            awaitingNextInput = false;
        } else {
            currentOperand = handleNumberInput(previousOperand, currentOperand, input);
        }
        updateDisplay();
    },
    // Operator input handler
    (key) => {
        if (currentOperand !== '') {
            if (previousOperand !== '' && operator) {
                performCalculation();
            }
            previousOperand = currentOperand;
            currentOperand = '';
            operator = key;
            awaitingNextInput = true;
            updateDisplay();
        } else if (previousOperand !== '') {
            operator = key;
            updateDisplay();
        }
    },
    performCalculation,
    // Clear all function
    () => {
        currentOperand = '';
        previousOperand = '';
        operator = null;
        awaitingNextInput = false;
        updateDisplay();
    },
    // Erase last digit function
    () => {
        if (currentOperand !== '') {
            currentOperand = currentOperand.slice(0, -1);
            if (currentOperand === '-') currentOperand = '';
        } else if (previousOperand !== '') {
            previousOperand = previousOperand.slice(0, -1);
            if (previousOperand === '-') previousOperand = '';
        }
        if (currentOperand === '' && previousOperand === '') operator = null;
        updateDisplay();
    },
    updateDisplay
);

// Set up number button click handlers
keyOperations.numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.textContent;

        if (awaitingNextInput) {
            currentOperand = handleNumberInput(previousOperand, currentOperand, input);
            awaitingNextInput = false;
        } else {
            currentOperand = handleNumberInput(previousOperand, currentOperand, input);
        }
        updateDisplay();
    });
});

// Set up operator button click handlers
keyOperations.operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperand !== '') {
            if (previousOperand !== '' && operator) {
                performCalculation();
            }
            previousOperand = currentOperand;
            currentOperand = '';
            operator = button.textContent;
            awaitingNextInput = true;
            updateDisplay();
        } else if (previousOperand !== '') {
            operator = button.textContent;
            updateDisplay();
        }
    });
});

// Set up positive/negative toggle button handler
keyOperations.posNegBtn.addEventListener('click', () => {
    if (currentOperand !== '') {
        currentOperand = toggleSign(currentOperand);
    } else if (previousOperand !== '' && operator) {
        previousOperand = toggleSign(previousOperand);
    }

    updateDisplay();
});

// Set up equals button handler
keyOperations.equalBtn.addEventListener('click', performCalculation);

// Set up clear button handler
keyOperations.clearBtn.addEventListener('click', () => {
    currentOperand = '';
    previousOperand = '';
    operator = null;
    awaitingNextInput = false;
    updateDisplay();
});

// Set up erase button handler
keyOperations.eraseBtn.addEventListener('click', () => {
    if (currentOperand !== '') {
        // Perform backspace on currentOperand
        if (currentOperand.length === 1) {
            currentOperand = ''; // Clear if it's a single character
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }

        // If only the '-' sign remains, clear it
        if (currentOperand === '-') {
            currentOperand = '';
        }

    } else if (previousOperand !== '') {
        
        // Perform backspace on previousOperand
        if (previousOperand.length === 1) {
            previousOperand = ''; // Clear if it's a single character
        } else {
            previousOperand = previousOperand.slice(0, -1);
        }

        // If only the '-' sign remains, clear it
        if (previousOperand === '-') {
            previousOperand = '';
        }

        // If both operands are empty, reset the operator
        if (currentOperand === '' && previousOperand === '') {
            operator = null;
        }
    }

    updateDisplay();
});