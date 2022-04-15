function add(number1, number2) {
    return number1 + number2;
}

function substract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    if(number2 === 0) return;
    return number1 / number2;
}

function operate(operator, number1, number2) {
    switch(operator) {
        case '+':
            return add(number1, number2);
            break;
        case '-':
            return substract(number1, number2);
            break;
        case '*':
            return multiply(number1, number2);
            break;
        case '/':
            return divide(number1, number2);
            break;
        default:
            return number2;
            break;
    }
}

function updateDisplay() {
    displayFirst.innerHTML = first;
    displaySecond.innerHTML = second;
}

function appendNumber(number) {
    if(number === '.' && second.includes('.')) return;

    second = second + number;
    updateDisplay();
}

function clear() {
    first = '';
    second = '';
    op = '';
    updateDisplay();
}

function backspace() {
    if(second == '') return;

    second = second.slice(0, -1);
    updateDisplay();
}

function showResult() {
    first = '';
    second = operate().toString();
}

function equals() {
    let firstNum = first === '' ? 0 : parseFloat(first);
    let secondNum = parseFloat(second);

    let result = operate(op, firstNum, secondNum);

    first = '';
    second = result == undefined ? 'ERROR' : result.toString();
    
    updateDisplay()
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

numbers.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.innerHTML));
});

clearButton.addEventListener('click', () => clear());

backButton.addEventListener('click', () => backspace());

equalsButton.addEventListener('click', () => equals());