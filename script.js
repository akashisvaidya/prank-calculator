//grab all the button as in array
// loop through them and add addeventlistner to each element
// when elements are clicked, get the buttons inner text and store them in some variable
//grab the display element
// create a function to display clicked to the display element

const allButtons = Array.from(document.querySelectorAll(".btn"));
console.log(allButtons); //array.from is changing the nodelist to array.
const displayElm = document.querySelector(".display");
let strToDisplay = "";

const operators = ["%", "/", "*", "-", "+"];
let lastOperator = "";

const audio = new Audio("aa.wav");
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
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }
    strToDisplay += val;

    display(strToDisplay);
    console.log(strToDisplay);
  });
  console.log(btn);
}); // anonymous function to receive all button as array

const display = (str) => {
  displayElm.innerText = str || "0.00";
};

const total = () => {
  const extra = randomNumber();

  if (extra > 0) {
    displayElm.style.background = "red";
    displayElm.style.color = "white";
    displayElm.classList.add("prank");
    audio.play();
  }
  console.log(extra);
  const ttl = eval(strToDisplay) + extra;
  strToDisplay = ttl.toString();
  display(strToDisplay);
};

const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  return num < 5 ? num : 0;
};
