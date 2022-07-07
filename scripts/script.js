function add() {
    return parseFloat(first) + parseFloat(second);
}

function substract() {
    return parseFloat(first) - parseFloat(second)
}

function multiply() {
    return parseFloat(first) * parseFloat(second);
}

function divide() {
    if(parseFloat(second) === 0) return;
    return parseFloat(first) / parseFloat(second);
}


function opResult() {
    switch(op) {
        case '+':
            return add().toString();
            break;
        case '-':
            return substract().toString();
            break;
        case '*':
            return multiply().toString();
            break;
        case '/':
            let res = divide();
            return res ? res.toString() : res;
            break;
        default:
            return second.toString();
            break;
    }
}

function updateDisplay() {
    displayFirst.innerHTML = `${first} ${op}`;
    displaySecond.innerHTML = second
}

function appendNumber(number) {
    if(number === '.' && (second === '' ||second.includes('.'))) return;
    if(number === '0' && second === '0') return;

    if(reset) {
        clear();
        reset = false;
    }

    if(isNewLine) {
        first = second;
        isNewLine = !isNewLine;
        second = '';
    }

    second = second + number;

    updateDisplay();
}

function appendOperator(operator) {
    if(reset) {
        clear();
        reset = false;
    }

    isNewLine = true;

    if(second === '') {
        isNewLine = false;
    } else {
        first = opResult()
        if(first) {
            second = first;
        } else {
            second = 'ERROR!';
            reset = true;
        }
    }

    if(first !== '') op = operator;

    updateDisplay();
}

function clear() {
    first = '';
    second = '';
    result = 0;
    op = '';
    isNewLine = false;

    updateDisplay();
}

function backspace() {
    if(reset) {
        clear();
        reset = false;
    }

    if(second === '') return;

    second = second.slice(0, -1);

    if(second === '') isNewLine = false;

    updateDisplay();
}

function equals() {
    if(reset) {
        clear();
        reset = false;
    }

    if(first === '' && second === '') { 
        result = '';
    } else if(first === '') {
        result = second;
    } else if(second === ''){
        result = first;
    } else {
        result = opResult();
    }

    if(result) {
        second = result;
    } else {
        second = 'ERROR!';
        reset = true;
    }

    first = '';
    op = '';
    
    updateDisplay()
}

function handleKey(key) {
    if(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(key)) appendNumber(key);
    if(['+', '-', ,'*', '/'].includes(key))  appendOperator(key);
    if(['Enter', '='].includes(key)) equals();
    if(key === 'c') clear();
    if(key === 'Backspace') backspace();

}

const displayFirst = document.querySelector('.first');
const displaySecond = document.querySelector('.second');
const numbers = document.querySelectorAll('.btn-number');
const operations = document.querySelectorAll('.btn-operation');
const clearButton = document.querySelector('.btn-clear');
const backButton = document.querySelector('.btn-backspace');
const equalsButton = document.querySelector('.btn-equals');

let first = '';
let second = '';
let op = '';
let result = '';
let isNewLine = false;
let reset = false;

numbers.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.innerHTML));
});

operations.forEach(button => {
    button.addEventListener('click', () => appendOperator(button.innerHTML));
});

clearButton.addEventListener('click', () => clear());

backButton.addEventListener('click', () => backspace());

equalsButton.addEventListener('click', () => equals());

document.addEventListener('keydown', e => handleKey(e.key));