// Basic arithmetic operations

const add = (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1, num2) => {
    return num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const divide = (num1, num2) => {
    return num1 / num2;
}


// Maximum number of digits allowed in the calculator
const MAX_DIGITS = 22;

// Toggles +/- of a number
const toggleSign = (number) => {
    if (number === '' || number === '0') return number;
    return number.startsWith('-') ? number.slice(1) : '-' + number;
};

// Round a number to four decimal places for consistent display
const roundToFourDecimals = (number) => {
    return Math.round(number * 10000) / 10000;
};

// Perform the specified operation on two numbers
const operate = (operator, num1, num2) => {
    let operationResult;
    switch (operator) {
        case '+':
            operationResult = add(num1, num2);
            break;
        case '−':
            operationResult = subtract(num1, num2);
            break;
        case '×':
            operationResult = multiply(num1, num2);
            break;
        case '÷':
            // Handle division by zero
            if (num1 !== 0 && num2 === 0) {
                return 'No.';
            } else {
                operationResult = divide(num1, num2);
                break;
            }
        default:
            operationResult = num1;
    }
    return typeof operationResult === 'number' ? roundToFourDecimals(operationResult) : operationResult;
}

// Handle number input, considering maximum digits and decimal points
const handleNumberInput = (previousOperand, currentOperand, input) => {
    previousOperand = previousOperand !== undefined ? previousOperand : '';
    currentOperand = currentOperand !== undefined ? currentOperand : '';

    // Count total digits, excluding decimal points and minus signs
    const totalDigits = previousOperand.replace(/[.-]/g, '').length + currentOperand.replace(/[.-]/g, '').length;

    // Prevent input if total digits exceed the maximum limit
    if (totalDigits >= MAX_DIGITS) {
        return currentOperand; 
    }

    // Handle decimal input
    if (input === '.') {
        if (!currentOperand.includes('.')) {
            return currentOperand + input;
        }
        return currentOperand;
    }
    return currentOperand + input;
};

// Format number for display, handling large numbers with exponential notation
const formatNumberForDisplay = (number) => {
    console.log("formatNumberForDisplay input:", number);
    if (number === '' || number === '-') return number;
    let formatted = parseFloat(number).toString();
    if (formatted.length > MAX_DIGITS) {
        formatted = parseFloat(number).toExponential(4);
    }
    console.log("formatNumberForDisplay output:", formatted);
    return formatted;
};

// Check if a string represents a valid number
const isValidNumber = (str) => {
    return !isNaN(parseFloat(str)) && isFinite(str);
};

export { add, subtract, multiply, divide, operate, handleNumberInput, isValidNumber, formatNumberForDisplay, toggleSign };

