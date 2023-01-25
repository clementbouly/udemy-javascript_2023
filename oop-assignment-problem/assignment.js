class Course {
	#price
	#length

	constructor(title, length, price) {
		this.title = title
		this.#length = length
		this.#price = price
	}

	get price() {
		return this.#price
	}

	get formattedPrice() {
		return `${this.price.toFixed(2)}€`
	}

	set price(newPrice) {
		if (typeof newPrice !== "number") {
			throw new Error("Price must be a number")
		}
		if (newPrice < 0) {
			throw new Error("Price must be a positive number")
		}
		this.#price = newPrice
	}

	getCourseRentability() {
		return (this.price / this.#length).toFixed(2) + "€"
	}

	// nice course summary
	toString() {
		return `Course "${this.title}" has a length of ${this.#length} hours and costs ${
			this.formattedPrice
		} euros. The rentability is ${this.getCourseRentability()} per hour.`
	}
}

class PraticalCourse extends Course {
	constructor(title, length, price, numOfExercises) {
		super(title, length, price)
		this.numOfExercises = numOfExercises
	}

	toString() {
		return `${super.toString()} The course has ${this.numOfExercises} exercises.`
	}
}

class TheoricalCourse extends Course {
	constructor(title, length, price) {
		super(title, length, price)
	}

	publish() {
		console.log("Publishing course...")
	}
}

const course1 = new PraticalCourse("JavaScript", 10, 25, 20)
const course2 = new TheoricalCourse("React", 5, 50)

class Person {
	#name
	#age

	constructor(name, age) {
		this.#name = name
		this.#age = age
	}

	get name() {
		return this.#name
	}

	get age() {
		return this.#age
	}

	testPerson() {
		console.log("testPerson")
	}

	toString() {
		return `Name: ${this.name}, Age: ${this.age}`
	}
}

class AgedPerson extends Person {
	#job

	constructor(name, age, job) {
		super(name, age)
		this.#job = job
	}

	get job() {
		return this.#job
	}

	testAgedPerson = () => {
		console.log("testAgedPerson")
	}

	testAgedPerson2() {
		console.log("testAgedPerson2")
	}

	toString() {
		return `${super.toString()}, Job: ${this.job}`
	}
}

const agedPerson = new AgedPerson("John", 30, "Developer")
const agedPerson2 = new AgedPerson("John", 30, "Developer")
const person = new Person("Jane", 25)

function MyFunction() {
	MyFunction.staticMethod = function () {
		console.log("static method")
	}

	this.instanceMethod = function () {
		console.log("instance method")
	}

	MyFunction.prototype.prototypeMethod = function () {
		console.log("prototype method")
	}
}

class MyClass {
	static staticMethod() {
		console.log("static method")
	}
	instanceMethod = () => {
		console.log("instance method")
	}
	prototypeMethod() {
		console.log("prototype method")
	}
}

const myClass = new MyClass()
const myFunction = new MyFunction()

console.log(myFunction)
console.log(myClass)
