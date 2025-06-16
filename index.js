var a = '', b = '', operator = null;

function updateDisplay(evaluated) {
    let operation = '';
    if (a !== '') {
        operation += a;
    }

    if (operator !== null) {
        operation += operator;
    }

    if (b !== '') {
        operation += b;
    }

    if (evaluated) {
        document.querySelector('#result').innerHTML = operation;
    } else {
        document.querySelector('#operation').innerHTML = operation;
        document.querySelector('#result').innerHTML = operation;
    }
}

function evaluate() {
    if (operator === '+') {
        a = Number(a) + Number(b);
    } else if (operator === '-') {
        a = Number(a) - Number(b);
    } else if (operator === 'X') {
        a = Number(a) * Number(b);
    } else if (operator === '/') {
        a = Number(a) / Number(b);
    } else if (operator === '%') {
        a = Number(a) % Number(b);
    }

    operator = null;
    b = '';
}

function calculate(e) {
    let value = e.target.innerHTML;

    if (isNaN(value)) {
        if (value === 'C') {
            a = '';
            b = '';
            operator = null;
        } else if (value === '+') {
            operator = '+';
        } else if (value === '-') {
            operator = '-';
        } else if (value === 'X') {
            operator = '*';
        } else if (value === '/') {
            operator = '/';
        } else if (value === '%') {
            operator = '%';
        } else if (value === '=') {
            evaluate();
        } else {
            var fn = e.target.getAttribute('data-function');
            if (fn === 'backspace') {
                if (b !== '') {
                    b = b.slice(0, -1);
                } else if (operator !== null) {
                    operator = null;
                } else if (a !== '') {
                    a = a.slice(0, -1);
                }
            }
        }
    } else {
        if (operator === null) {
            a += value;
        } else {
            b += value;
        }
    }

    var evaluated = value === '=';

    updateDisplay(evaluated);
}

var buttons = document.querySelectorAll('#buttons div');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
        calculate(e);
    });
};