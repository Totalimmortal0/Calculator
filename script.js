const btns = document.querySelectorAll(".calc-button")
const output = document.querySelector(".output")
const clearBtn = document.querySelector(".clear-button")

let num1 = ""
let num2 = ""
let operator = ""
let result = ""

function operate(n1, n2, operator) {
    switch (operator) {
        case "+":
            return n1 + n2
        case "-":
            return n1 - n2
        case "x":
            return n1 * n2
        case "÷":
            return n1 / n2
        default:
            return "Invalid operation"
    }
}

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const numRegex = /[0-9]/i;
        const opRegex = /[-+x÷]/i;

        if (btn.textContent.match(opRegex) && operator !== "" && num1 !== "" && num2 !== "") {
            result = operate(Number(num1), Number(num2), operator)
            num2 = ""
            if (result.toString().charAt(1) === ".") result = Number(result).toFixed(4)
            output.textContent = result
        }

        if (btn.textContent.match(numRegex) && result === "") {
            if (operator === "") {
                num1 += btn.textContent
                output.textContent = num1
            } else {
                num2 += btn.textContent
                output.textContent = num2
            }
        }

        if (btn.textContent.match(opRegex) && num1 !== "") {
            operator = btn.textContent
            if (result === "") output.textContent = operator
        }

        if (btn.textContent.match(numRegex) && result !== "") {
            num1 = result
            num2 += btn.textContent
            output.textContent = num2
        }

        if (btn.textContent === "=") {
            if (operator === "÷" && num2 === "0") {
                output.textContent = "you can't divide by 0 lol"
                num2 = ""
            } else {
                result = operate(Number(num1), Number(num2), operator)
                output.textContent = result
                console.log(result)
            }
        }

        if (result.toString().charAt(1) === ".") output.textContent = Number(result).toFixed(4)

        // console.log(btn.textContent)
        console.log("num1: " + num1)
        console.log("num2: " + num2)
        console.log("operator: " + operator)
        console.log("result: " + result)
    })
})

clearBtn.addEventListener("click", () => {
    output.textContent = ""
    num1 = ""
    num2 = ""
    operator = ""
    result = ""
})