let currentResult = 0
const logEntries = []

function getFloatUserInput() {
	return parseFloat(userInput.value)
}

function isUserInputValid(operator) {
	if (operator === "/" && getFloatUserInput() === 0) {
		alert("You can't divide by 0!")
		return false
	}
	if (isNaN(getFloatUserInput())) {
		alert("Please enter a valid number!")
		return false
	} else {
		return true
	}
}

function createAndWriteOutput(operator) {
	if (!isUserInputValid(operator)) {
		return
	}

	const input = getFloatUserInput()
	const initialResult = currentResult

	switch (operator) {
		case "+":
			currentResult += input
			break
		case "-":
			currentResult -= input
			break
		case "*":
			currentResult *= input
			break
		case "/":
			currentResult /= input
			break
		default:
			alert("Invalid operator!")
			break
	}

	let currentCalculationData = `${initialResult} ${operator} ${input}`

	const logEntry = {
		operation: operator,
		prevResult: initialResult,
		number: input,
		result: currentResult,
		calculation: currentCalculationData,
	}
	logEntries.push(logEntry)

	outputResult(currentResult, currentCalculationData)
}

function add() {
	createAndWriteOutput("+")
}

function substract() {
	createAndWriteOutput("-")
}

function multiply() {
	createAndWriteOutput("*")
}

function divide() {
	createAndWriteOutput("/")
}

function reset() {
	currentCalculationData = ""
	currentResult = 0
	outputResult(currentResult, currentCalculationData)
	console.log(logEntries)
}

addBtn.addEventListener("click", add)
subtractBtn.addEventListener("click", substract)
multiplyBtn.addEventListener("click", multiply)
divideBtn.addEventListener("click", divide)
resetBtn.addEventListener("click", reset)
