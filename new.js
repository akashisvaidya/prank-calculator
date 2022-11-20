const allButtons = Array.from(document.querySelectorAll(".btn"));

console.log(allButtons);
// alert("hello");

const displayElm = document.querySelector(".display");
let strToDisplay = "";

const operators = ["%", "-", "+", "%", "*"];

allButtons.map((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.innerText;

    displayElm.style.background = "";
    displayElm.style.color = "black";
    displayElm.classList.remove("prank");

    if (val === "AC") {
      strToDisplay = "";
      return display();
    }

    if (val === "C") {
      strToDisplay = strToDisplay.substring(0, strToDisplay.length - 1);
      return display(strToDisplay);
    }
    if (val === "=") {
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
      return total();
    }
    if (operators.includes(val)) {
      lastOperator = val;
      if (!strToDisplay) {
        return;
      }
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
    }
    if (val === ".") {
      if (lastOperator) {
        const operatorIndex = strToDisplay.lastIndexOf(lastOperator);
        const lastNumberSet = strToDisplay.slice(operatorIndex + 1);

        if (lastNumberSet.includes(".")) {
          return;
        }

        if (!lastOperator && strToDisplay.includes(".")) {
          return;
        }
      }
    }
    strToDisplay += val;
    display(strToDisplay);
    console.log(strToDisplay);
  });
});

const display = (str) => {
  displayElm.innerText = str || "0.00";
};

const total = () => {
  const ttl = eval(strToDisplay);
  strToDisplay = ttl.toString();
  display(strToDisplay);
};
