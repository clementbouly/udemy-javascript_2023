const randomNumber = Math.random() // produces random number between 0 (including) and 1 (excluding)

/* In the attached code assignment.js, you find a variable that holds a random number between 0 and 1.
 Write code that shows an alert (with any message) when that number is greater than 0.7. */

while (randomNumber > 0.7) {
	alert("The number is greater than 0.7")
	break
}

/* Create an array of numbers (any numbers of your choice)
 and loop through the array in two different ways - outputting the numbers inside of the loop. */

const numbers = [1, 2, 3, 4, 5]

for (let i = 0; i < numbers.length; i++) {
	console.log(numbers[i])
}

for (let number of numbers) {
	console.log(number)
}

/* Adjust one of the loops from the last task such that it actually starts at the end (last element)
 of the array and loops to the first element.
*/

for (let i = numbers.length - 1; i >= 0; i--) {
	console.log(numbers[i])
}

/*
Create another random number (in a separate constant) and show an alert in two different scenarios:
 Both are greater 0.7 OR at least one of the two is NOT greater than 0.2. */

const randomNumber2 = Math.random()

console.log(randomNumber)
console.log(randomNumber2)

while ((randomNumber > 0.7 && randomNumber2 > 0.7) || randomNumber < 0.2 || randomNumber2 < 0.2) {
	alert("Case")
	break
}
