class Calculator {
  constructor(displayMath, displayResult) {
    this.displayMath = displayMath;
    this.displayResult = displayResult;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previouseOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '×':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = Math.abs(computation);
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const strNum = number.toString();
    const integerDigits = parseFloat(strNum.split('.')[0]);
    const decimalDigits = strNum.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('sk', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  unfocus(el) {
    el.blur();
  }

  updateDisplay() {
    this.displayResult.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.displayMath.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.displayMath.innerText = '';
    }
  }
}

const operationsBtn = document.querySelectorAll('[data-operation]');
const numbersBtn = document.querySelectorAll('[data-number]');
const displayMath = document.querySelector('[data-math]');
const displayResult = document.querySelector('[data-result]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const equals = document.querySelector('[data-equals]');

const calculator = new Calculator(displayMath, displayResult);

numbersBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationsBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
    unfocus(btn);
  });
});

equals.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
  unfocus(btn);
});

allClearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
  unfocus(btn);
});

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
  unfocus(btn);
});

////////////////////////////////////////////////////////////////
/////////////// Switch to dark theme

const switcher = document.querySelector('.switch');
const body = document.body;

switcher.addEventListener('change', e => {
  const input = e.target.closest('input[type="checkbox"]');
  if (input.checked) body.classList.add('dark-theme');
  if (!input.checked) body.classList.remove('dark-theme');
});
