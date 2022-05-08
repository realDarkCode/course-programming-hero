// section: Notification
const errorNotification = document.getElementById("error-notification");
const successNotification = document.getElementById("success-notification");

errorNotification.style.display = "none";
successNotification.style.display = "none";
// todo: show notification on pin matches
// section: Pin Generate
const showPin = document.getElementById("showPin");
const generatePinBtn = document.getElementById("generatePin");
generatePinBtn.addEventListener("click", function () {
  reset();
  showPin.value = generatePin();
});
function generatePin(max = 4) {
  let _pin = "";
  for (let i = 0; i < 4; i++) {
    _pin += Math.floor(Math.random() * (max - 0 + 1) + 0);
  }
  return _pin;
}
// section: Match Pin
const typedPin = document.getElementById("typedPin");
const typingArea = document.getElementById("calc-body");
const submitButton = document.getElementById("submit-btn");
typedPin.value = "";
typingArea.addEventListener("click", function (event) {
  if (event.target.matches("div.button")) {
    const key = event.target.innerText;
    if (key == "C") {
      if (typedPin.value.length > 0) {
        typedPin.value = typedPin.value.slice(0, typedPin.value.length - 1);
      }
    } else if (key == "<") {
      typedPin.value = "";
    } else if (!isNaN(key)) {
      typedPin.value = typedPin.value + key;
    }
  }
});
// todo; try count
const tryCount = document.getElementById("try-count");
tryCount.innerText = 3;

submitButton.addEventListener("click", function () {
  if (typedPin.value.length > 0 && +typedPin.value == +showPin.value) {
    successNotification.style.display = "block";
  } else {
    errorNotification.style.display = "block";
    if (+tryCount.innerText > 0) {
      tryCount.innerText = +tryCount.innerText - 1;
    }
    if (+tryCount.innerText <= 0) {
      console.log("executing");
      submitButton.setAttribute("disabled", true);
      errorNotification.innerText = "❌ You have entered wrong pin 3 time, generate a new pin";
    }
  }
});

function reset() {
  submitButton.removeAttribute("disabled");
  tryCount.innerText = 3;
  successNotification.style.display = "none";
  errorNotification.style.display = "none";
  typedPin.value = "";
}
