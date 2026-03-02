// -------------------------
// DOM Elements
// -------------------------
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

// -------------------------
// Calculator State
// -------------------------
let firstNumber = '';
let operator = '';
let secondNumber = '';

// -------------------------
// Helper: Round result to 6 decimal places
// -------------------------
function roundResult(num) {
  return Math.round(num * 1000000) / 1000000;
}

// -------------------------
// Helper: Update display (max 10 characters)
// -------------------------
function updateDisplay(value) {
  display.textContent = value.toString().slice(0, 10);
}

// -------------------------
// Number Buttons
// -------------------------
numberButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var digit = button.textContent;

    // Prevent multiple decimals
    if (digit === '.' && ((operator === '' && firstNumber.includes('.')) || (operator !== '' && secondNumber.includes('.')))) {
      return;
    }

    if (operator === '') {
      firstNumber += digit;
      updateDisplay(firstNumber);
    } else {
      secondNumber += digit;
      updateDisplay(secondNumber);
    }
  });
});

// -------------------------
// Operator Buttons
// -------------------------
operatorButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var selectedOperator = button.textContent;

    if (firstNumber === '') return;
    else if (secondNumber === '') {
      operator = selectedOperator;
      updateDisplay(selectedOperator);
    } else {
      var num1 = Number(firstNumber);
      var num2 = Number(secondNumber);
      var result = operate(operator, num1, num2);

      firstNumber = roundResult(result);
      secondNumber = '';
      operator = selectedOperator;
      updateDisplay(firstNumber);
    }
  });
});

// -------------------------
// Equals Button
// -------------------------
equalsButton.addEventListener('click', function() {
  if (secondNumber === '') return;

  var num1 = Number(firstNumber);
  var num2 = Number(secondNumber);
  var result = operate(operator, num1, num2);

  firstNumber = roundResult(result);
  secondNumber = '';
  operator = '';
  updateDisplay(firstNumber);
});

// -------------------------
// Clear Button
// -------------------------
clearButton.addEventListener('click', function() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  updateDisplay('0');
});

// -------------------------
// Math Functions
// -------------------------
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
  if (b === 0) {
    alert("Cannot divide by 0");
    return 0;
  }
  return a / b;
}

// -------------------------
// Operate Function
// -------------------------
function operate(operator, a, b) {
  if (operator === '+') return add(a, b);
  else if (operator === '-') return subtract(a, b);
  else if (operator === '*') return multiply(a, b);
  else if (operator === '/') return divide(a, b);
}

// -------------------------
// Keyboard Support
// -------------------------
document.addEventListener('keydown', function(e) {
  const key = e.key;

  // Numbers & decimal
  if ((key >= '0' && key <= '9') || key === '.') {
    if (key === '.' && ((operator === '' && firstNumber.includes('.')) || (operator !== '' && secondNumber.includes('.')))) return;

    if (operator === '') {
      firstNumber += key;
      updateDisplay(firstNumber);
    } else {
      secondNumber += key;
      updateDisplay(secondNumber);
    }
  }

  // Operators
  else if (['+', '-', '*', '/'].includes(key)) {
    if (firstNumber === '') return;
    else if (secondNumber === '') {
      operator = key;
      updateDisplay(operator);
    } else {
      var num1 = Number(firstNumber);
      var num2 = Number(secondNumber);
      var result = operate(operator, num1, num2);

      firstNumber = roundResult(result);
      secondNumber = '';
      operator = key;
      updateDisplay(firstNumber);
    }
  }

  // Equals
  else if (key === 'Enter' || key === '=') {
    if (secondNumber === '') return;

    var num1 = Number(firstNumber);
    var num2 = Number(secondNumber);
    var result = operate(operator, num1, num2);

    firstNumber = roundResult(result);
    secondNumber = '';
    operator = '';
    updateDisplay(firstNumber);
  }

  // Clear
  else if (key.toLowerCase() === 'c' || key === 'Escape') {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    updateDisplay('0');
  }

  // Backspace
  else if (key === 'Backspace') {
    if (operator === '') {
      firstNumber = firstNumber.slice(0, -1);
      updateDisplay(firstNumber || '0');
    } else {
      secondNumber = secondNumber.slice(0, -1);
      updateDisplay(secondNumber || '0');
    }
  }
});