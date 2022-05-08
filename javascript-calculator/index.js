window.onload = main;

// references
const displayArea = document.getElementById("display");
const inputArea = document.getElementsByClassName("button")[0];
let result = 0;
let firstNumber = null,
  secondNumber = null;
let operation = null;
function main() {}

// Event Handlers
inputArea.addEventListener("click", (event) => {
  const dataType = event.target.getAttribute("data-type");
  if (!event.target.matches("button")) return;
  // Numbers and double zero
  if (dataType == "number" || dataType == "decimal" || dataType == "zerozero") {
    const previousInput = +displayArea.innerText == 0 ? "" : displayArea.innerText;
    displayArea.innerText = previousInput + event.target.innerText;
  }
  // backspace
  else if (dataType == "backspace") {
    const value = displayArea.innerText;
    if (value.length > 1) {
      displayArea.innerText = value.slice(0, value.length - 1);
    } else {
      displayArea.innerText = "0";
    }
  }
  // AC/clear  button
  else if (dataType == "clear") {
    displayArea.innerText = "0";
    result = 0;
    firstNumber = null;
    secondNumber = null;
  }
  // operation keys
  else if (dataType == "operator") {
    const opr = event.target.getAttribute("data-key");
    operation = opr;
    if (!firstNumber) {
      firstNumber = parseFloat(displayArea.innerText);
      displayArea.innerText = "";
    } else {
      secondNumber = parseFloat(displayArea.innerText);
      calculate();
      displayArea.innerText = result;
    }
  } else if (dataType == "equal") {
    if (firstNumber && operation) {
      secondNumber = parseFloat(displayArea.innerText);
      calculate();
      displayArea.innerText = result;
    }
  }
});
function calculate() {
  try {
    if (!(firstNumber && secondNumber && operation)) return;
    switch (operation) {
      case "multiply":
        result = +firstNumber * +secondNumber;
        break;
      case "subtract":
        result = +firstNumber - +secondNumber;
        break;
      case "add":
        result = +firstNumber + +secondNumber;
        break;
      case "divide":
        result = +firstNumber / +secondNumber;
        break;
      case "modulo":
        result = +firstNumber % +secondNumber;
        break;

      default:
        result = "Error";
        break;
    }
    operation = null;
    firstNumber = null;
    secondNumber = null;
    result = result.toFixed(5);
  } catch (error) {
    result = "Error";
  }
}
