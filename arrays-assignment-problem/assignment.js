// ASSIGNEMENT 1 //
const numbers = [14, 22, 3, 34, 51, 4256, 547, 58, 459, 310]
numbersFiltered = numbers.filter((number) => number > 5)
numbersMapped = numbers.map((number) => ({ num: number }))
numbersReduced = numbers.reduce((acc, number) => acc * number, 1)

console.log(numbersFiltered)
console.log(numbersMapped)
console.log(numbersReduced)

// ASSIGNEMENT 2 //
const findMax = (...args) => {
	const sorted = [...args].sort((a, b) => a - b)
	return sorted.pop()
}

console.log(findMax(...numbers))

// ASSIGNEMENT 3 //

const findMaxMin = (...args) => {
	const sorted = [...args].sort((a, b) => a - b)
	return [sorted.pop(), sorted.shift()]
}

const [max, min] = findMaxMin(...numbers)

console.log(max, min)

// ASSIGNEMENT 4 //

const list = new Set()

list.add(1)
list.add(2)
list.add(1)

console.log(list)