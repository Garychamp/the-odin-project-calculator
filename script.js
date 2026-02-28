const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementByID('equals');
const clearButton = document.getElementByID('clear');

numberButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var digit = button.textContent;

    if (operator === '') {
      firstNumber += digit;
      display.textContent = firstNumber;
    } else {
      secondNumber += digit;
      display.textContent = secondNumber;
    }
  });
});


function add(a, b) {
  return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate (operator, a, b) {
    if (operator === '+') {
    return add(a, b);
    } else if (operator === '-') {
    return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    }
}

let firstNumber = '';
let operator = '';
let secondNumber = '';


