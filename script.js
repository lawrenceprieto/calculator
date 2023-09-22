let input = document.getElementById('display');
let buttons = document.querySelectorAll('button');

let string = "";
let hasDecimal = false;
let lastOperator = null;
let lastInputWasOperator = false;

input.value = "0";

let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            try {
                string = string.replace(/x/g, '*').replace(/÷/g, '/');
                let result = eval(string);
                if (isNaN(result) || !isFinite(result)) {
                    input.value = "Error";
                } else {
                    string = String(parseFloat(result.toFixed(15))); // Increase precision
                    input.value = string;
                }
            } catch (error) {
                input.value = "Error";
            }
        } else if (e.target.innerHTML == 'AC') {
            string = "";
            hasDecimal = false;
            lastOperator = null;
            lastInputWasOperator = false;
            input.value = "0";
        } else if (e.target.innerHTML == 'DEL') {
            if (string.length > 0) {
                if (string.charAt(string.length - 1) === '.') {
                    hasDecimal = false;
                }
                if (lastInputWasOperator) {
                    lastOperator = null;
                }
                string = string.substring(0, string.length - 1);
                input.value = string;
            }
        } else {
            if (e.target.innerHTML === '.') {
                if (!hasDecimal) {
                    string += e.target.innerHTML;
                    input.value = string;
                    hasDecimal = true;
                }
            } else if (e.target.innerHTML === '+' || e.target.innerHTML === '-' || e.target.innerHTML === '*' || e.target.innerHTML === '/') {
                if (!lastInputWasOperator) {
                    if (lastOperator !== null) {
                        string = string.replace(new RegExp('\\' + lastOperator + '$'), '');
                    }
                    string += e.target.innerHTML;
                    lastOperator = e.target.innerHTML;
                    hasDecimal = false;
                    input.value = string;
                    lastInputWasOperator = true;
                }
            } else {
                if (input.value === "0" || lastInputWasOperator) {
                    string += e.target.innerHTML;
                } else {
                    string += e.target.innerHTML;
                }
                input.value = string;
                lastInputWasOperator = false;
            }
        } 
    });
});
