

    let display = document.querySelector(".display");

let firstNumber = "";
let operator = "";
let secondNumber = "";

let justCalculated = false;


// =========================
// APPEND NUMBER / DECIMAL
// =========================

function appendValue(value) {

    // Agar previous calculation ke baad number press hua
    // to new calculation start hogi
    if (justCalculated) {
        firstNumber = "";
        operator = "";
        secondNumber = "";
        justCalculated = false;
    }

    // First number
    if (operator === "") {

        // Decimal already hai
        if (value === "." && firstNumber.includes(".")) {
            return;
        }

        // Starting me "." press karne par 0. bana do
        if (value === "." && firstNumber === "") {
            firstNumber = "0.";
        } 
        else {
            firstNumber += value;
        }

        display.textContent = firstNumber || "0";
    }

    // Second number
    else {

        // Decimal already hai
        if (value === "." && secondNumber.includes(".")) {
            return;
        }

        // Operator ke immediately baad "." press
        if (value === "." && secondNumber === "") {
            secondNumber = "0.";
        } 
        else {
            secondNumber += value;
        }

        display.textContent =
            firstNumber + operator + secondNumber;
    }
}


// =========================
// OPERATOR
// =========================

function calculate(op) {

    // Agar first number hi nahi hai
    if (firstNumber === "") {
        return;
    }

    // Agar calculation ke baad operator press kiya
    if (justCalculated) {
        justCalculated = false;
    }

    // Agar user ne pehle se operator laga rakha hai
    // aur second number nahi diya
    if (operator !== "" && secondNumber === "") {
        operator = op;

        display.textContent =
            firstNumber + operator;

        return;
    }

    // Agar second number already available hai
    // to pehle calculation kar do
    if (operator !== "" && secondNumber !== "") {
        final();

        // final() ke baad result firstNumber ban gaya
        operator = op;
        secondNumber = "";

        display.textContent =
            firstNumber + operator;

        return;
    }

    operator = op;

    display.textContent =
        firstNumber + operator;
}


// =========================
// FINAL CALCULATION
// =========================

function final() {

    // Valid expression nahi hai
    if (
        firstNumber === "" ||
        operator === "" ||
        secondNumber === ""
    ) {
        return;
    }

    let num1 = Number(firstNumber);
    let num2 = Number(secondNumber);

    let result;


    // Divide by zero
    if (operator === "÷" && num2 === 0) {
        display.textContent = "Error";

        firstNumber = "";
        operator = "";
        secondNumber = "";
        justCalculated = true;

        return;
    }


    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "×":
            result = num1 * num2;
            break;

        case "÷":
            result = num1 / num2;
           
            break;

        default:
            return;
    }


    // Result ko firstNumber bana do
    firstNumber = String(result.toFixed(10));

    operator = "";
    secondNumber = "";

    display.textContent = firstNumber;

    justCalculated = true;
}


// =========================
// AC - CLEAR ALL
// =========================

function clearAll() {

    firstNumber = "";
    operator = "";
    secondNumber = "";

    justCalculated = false;

    display.textContent = "0";
}


// =========================
// C - CLEAR CURRENT
// =========================

function clearCurrent() {

    // Agar calculation ke baad C press hua
    if (justCalculated) {
        clearAll();
        return;
    }


    // Second number delete
    if (secondNumber !== "") {

        secondNumber =
            secondNumber.slice(0, -1);

        display.textContent =
            firstNumber + operator + secondNumber;
    }


    // Operator delete
    else if (operator !== "") {

        operator = "";

        display.textContent =
            firstNumber;
    }


    // First number delete
    else if (firstNumber !== "") {

        firstNumber =
            firstNumber.slice(0, -1);

        display.textContent =
            firstNumber || "0";
    }
}


// =========================
// KEYBOARD SUPPORT
// =========================

document.addEventListener("keydown", (e) => {

    // Numbers
    if (e.key >= "0" && e.key <= "9") {
        appendValue(e.key);
    }


    // Decimal
    else if (e.key === ".") {
        appendValue(".");
    }


    // Operators
    else if (e.key === "+") {
        calculate("+");
    }

    else if (e.key === "-") {
        calculate("-");
    }

    else if (e.key === "*" || e.key === "x") {
        calculate("×");
    }

    else if (e.key === "/") {
        e.preventDefault();
        calculate("÷");
    }


    // Enter
    else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        final();
    }


    // Backspace = C
    else if (e.key === "Backspace") {
        clearCurrent();
    }


    // Escape = AC
    else if (e.key === "Escape") {
        clearAll();
    }
});