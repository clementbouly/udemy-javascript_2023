let currentCalculationData = ""
let currentResult = 0

addBtn.addEventListener("click", () => {
	if (currentCalculationData === "") {
		currentCalculationData = userInput.value
	} else {
		currentCalculationData += " + " + userInput.value
	}
	currentResult += parseInt(userInput.value)
	outputResult(currentResult, currentCalculationData)
})

subtractBtn.addEventListener("click", () => {
	currentCalculationData += " - " + userInput.value

	currentResult -= parseInt(userInput.value)
	outputResult(currentResult, currentCalculationData)
})

multiplyBtn.addEventListener("click", () => {
	if (currentCalculationData === "") {
		currentCalculationData = "0 * " + userInput.value
	} else {
		currentCalculationData += " * " + userInput.value
	}

	currentResult *= parseInt(userInput.value)
	outputResult(currentResult, currentCalculationData)
})

divideBtn.addEventListener("click", () => {
	if (userInput.value === "0") {
		alert("You can't divide by 0!")
		return
	}

	if (currentCalculationData === "") {
		currentCalculationData = "0 / " + userInput.value
	} else {
		currentCalculationData += " / " + userInput.value
	}

	currentResult /= parseInt(userInput.value)
	outputResult(currentResult, currentCalculationData)
})

resetBtn.addEventListener("click", () => {
    currentCalculationData = ""
    currentResult = 0
    outputResult(currentResult, currentCalculationData)
})


