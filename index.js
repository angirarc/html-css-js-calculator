var a = '', b = '', operator = null;

// Update the display based on the current operation or result
function updateDisplay(evaluated) {
    var operation = '';
    if (a !== '') {
        operation += a;
    }

    if (operator !== null) {
        // Show operator as 'X' instead of '*'
        operation += (operator === '*') ? 'X' : operator;
    }

    if (b !== '') {
        operation += b;
    }

    if (evaluated) {
        // When evaluated, show result ('a') as string
        document.querySelector('#result').innerHTML = a || '0';
    } else {
        document.querySelector('#operation').innerHTML = operation || '0';
        document.querySelector('#result').innerHTML = operation || '0';
    }
}

function evaluate() {
    if (operator === null || b === '') return;

    var numA = Number(a);
    var numB = Number(b);
    var result;

    switch (operator) {
        case '+':
            result = numA + numB;
            break;
        case '-':
            result = numA - numB;
            break;
        case '*':
            result = numA * numB;
            break;
        case '/':
            if (numB === 0) {
                alert('Error: Division by zero');
                clearAll();
                updateDisplay(false);
                return;
            }
            result = numA / numB;
            break;
        case '%':
            if (numB === 0) {
                alert('Error: Modulo by zero');
                clearAll();
                updateDisplay(false);
                return;
            }
            result = numA % numB;
            break;
        default:
            return;
    }

    a = result.toString();
    b = '';
    operator = null;
}

function clearAll() {
    a = '';
    b = '';
    operator = null;
}

function calculate(e) {
    var value = e.target.innerHTML;

    if (value === '.') {
        // Handle decimal input for a and b
        if (operator === null) {
            if (a.indexOf('.') === -1) {
                a += value;
            }
        } else {
            if (b.indexOf('.') === -1) {
                b += value;
            }
        }
        updateDisplay(false);
        return;
    }

    if (isNaN(value)) {
        if (value === 'C') {
            clearAll();
        } else if (value === '+') {
            processOperator('+');
        } else if (value === '-') {
            processOperator('-');
        } else if (value === 'X') {
            processOperator('*');
        } else if (value === '/') {
            processOperator('/');
        } else if (value === '%') {
            processOperator('%');
        } else if (value === '=') {
            evaluate();
        } else {
            var fn = e.target.getAttribute('data-function');
            if (fn === 'backspace') {
                backspace();
            }
        }
    } else {
        // Number input
        if (operator === null) {
            // Avoid leading zeros (allow single zero only)
            if (value === '0' && a === '0') return;
            a += value;
        } else {
            if (value === '0' && b === '0') return;
            b += value;
        }
    }

    updateDisplay(value === '=');
}

function processOperator(op) {
    if (operator !== null && b !== '') {
        evaluate(); // Evaluate existing before setting new operator
    }
    operator = op;
}

function backspace() {
    if (b !== '') {
        b = b.slice(0, -1);
    } else if (operator !== null) {
        operator = null;
    } else if (a !== '') {
        a = a.slice(0, -1);
    }
}

var buttons = document.querySelectorAll('#buttons div');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
        calculate(e);
    });
}