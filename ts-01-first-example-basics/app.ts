const input1 = document.getElementById("num1") as HTMLInputElement
const input2 = <HTMLInputElement>document.getElementById("num2")
const button = document.querySelector("button") as HTMLButtonElement

function add(a: number, b: number) {
	return a + b
}

function print(value) {
	console.log(value)
}

type Result = { val: number }

let results: Array<Result> = []

button?.addEventListener("click", function () {
	const result = add(+input1.value, +input2.value)
	const resultObj: Result = { val: result }
	results.push(resultObj)
	print(results)
})
