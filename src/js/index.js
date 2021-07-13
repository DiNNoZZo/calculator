class Calculator {
  _operationsBtns = document.querySelectorAll('[data-operation]');
  _numbersBtns = document.querySelectorAll('[data-number]');
  _displayMath = document.querySelector('[data-math]');
  _displayResult = document.querySelector('[data-result]');
  _deleteBtn = document.querySelector('[data-delete]');
  _allClearBtn = document.querySelector('[data-all-clear]');
  _equals = document.querySelector('[data-equals]');
  _switcher = document.querySelector('.switch');
  _body = document.body;

  constructor() {
    this._addEventListenerBtns(this._numbersBtns);
    this._addEventListenerOperation(this._operationsBtns);
    this._addEventListener(this._deleteBtn, this._delete.bind(this));
    this._addEventListener(this._allClearBtn, this._clear.bind(this));
    this._addEventListener(this._equals, this._compute.bind(this));
    this._addEventListenerSwitch(this._switcher);
    this._clear();
  }

  _clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  _delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  _appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  _chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previouseOperand !== '') {
      this._compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  _compute() {
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

  _getDisplayNumber(number) {
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

  _updateDisplay() {
    this._displayResult.innerText = this._getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this._displayMath.innerText = `${this._getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this._displayMath.innerText = '';
    }
  }

  _addEventListenerBtns(buttons) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        this._appendNumber(btn.innerText);
        this._updateDisplay();
      });
    });
  }

  _addEventListenerOperation(operations) {
    operations.forEach(operation => {
      operation.addEventListener('click', () => {
        this._chooseOperation(operation.innerText);
        this._updateDisplay();
      });
    });
  }

  _addEventListenerSwitch(switcher) {
    switcher.addEventListener('change', e => {
      const input = e.target.closest('input[type="checkbox"]');
      if (input.checked) this._body.classList.add('dark-theme');
      if (!input.checked) this._body.classList.remove('dark-theme');
    });
  }

  _addEventListener(element, handler) {
    element.addEventListener('click', () => {
      handler();
      this._updateDisplay();
    });
  }
}

const calculator = new Calculator();
