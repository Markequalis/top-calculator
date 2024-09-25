// Map keyboard keys to calculator actions
const keyActions = {
    '0': 'number',
    '1': 'number',
    '2': 'number',
    '3': 'number',
    '4': 'number',
    '5': 'number',
    '6': 'number',
    '7': 'number',
    '8': 'number',
    '9': 'number',
    '.': 'decimal',
    '+': 'operator',
    '-': 'operator',
    '*': 'operator',
    '/': 'operator',
    'Enter': 'equals',
    '=': 'equals',
    'Backspace': 'erase',
    'c': 'clear',
    'C': 'clear',
};

// Map keyboard operator symbols to calculator display symbols
const operatorMap = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷'
};

// Set up keyboard input handling
export const handleKeyboardInput = (handleNumberInput, handleOperator, performCalculation, clearAll, eraseLastDigit, updateDisplay) => {
    document.addEventListener('keydown', (event) => {
        const action = keyActions[event.key];
        
        // Prevent default behavior for Enter and Backspace
        if (['Enter', 'Backspace'].includes(event.key)) {
            event.preventDefault();
        }

        // Handle different types of keyboard inputs
        switch (action) {
            case 'number':
            case 'decimal':
                handleNumberInput(event.key);
                break;
            case 'operator':
                handleOperator(operatorMap[event.key] || event.key);
                break;
            case 'equals':
                performCalculation();
                break;
            case 'erase':
                eraseLastDigit();
                break;
            case 'clear':
                clearAll();
                break;
            default:
                return;
        }
    });
};