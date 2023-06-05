import { Calculator } from "./logic.js";

export function manageEvents() {
  const numberButtons = document.querySelectorAll(".number");
  const result = document.querySelector(".result");
  const resetButton = document.querySelector(".reset");

  //number buttons
  numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (result.innerText === "0") {
        result.innerText = e.currentTarget.innerText;
      } else if (isLastOperator(result)) {
        result.innerText += ` ${e.currentTarget.innerText}`;
      } else {
        result.innerText += e.currentTarget.innerText;
      }
    });
  });
  //reset buttons(CE)
  resetButton.addEventListener("click", () => {
    result.innerText = 0;
  });

  //del btn
  const del = document.querySelector(".del");
  del.addEventListener("click", () => {
    if (result.innerText.length > 1) {
      let finalText = result.innerText.split("");
      finalText.pop("");
      result.innerText = finalText.join("");
      return;
    }
    result.innerText = "0";
  });

  //on opClick

  const operators = document.querySelectorAll(".operator");
  operators.forEach((op) => {
    op.addEventListener("click", (e) => {
      if (isLastOperator(result)) {
        return;
      }
      result.innerText += " " + e.currentTarget.innerText;
    });
  });

  //on resulter click

  const equalButton = document.querySelector(".resulter");
  equalButton.addEventListener("click", () => {
    try {
      result.innerText = Calculator.parse(result.innerText);
    } catch (e) {
      return;
    }
  });

  //decimal point
  const pointButton = document.querySelector(".decimal-point");
  pointButton.addEventListener("click", () => {
    if (isLastOperator(result)) {
      return;
    }
    result.innerText += ".";
  });

  //negator

  const negator = document.querySelector(".negator");
  negator.addEventListener("click", () => {
    if (isLastOperator(result)) {
      return;
    } else if (isFinite(+getLastLetterOf(result.innerText))) {
      let resultStr = result.innerText.split(" ");
      resultStr[resultStr.length - 1] = -+resultStr.at(-1);
      result.innerText = resultStr.join(" ");
    }
  });
}

function getLastLetterOf(str) {
  return str[str.length - 1];
}

function isLastOperator(result) {
  return Calculator.isOperator(getLastLetterOf(result.innerText));
}
