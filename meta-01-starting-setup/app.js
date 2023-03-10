const company = {
	name: "Acme",
	address: {
		city: "New York",
		state: "NY",
		zip: "10001",
	},
	employees: ["John", "Mary", "Bob"],
	revenue: 1000000,
	partners: [
		{
			name: "Google",
			revenue: 1000000,
		},
		{
			name: "Facebook",
			revenue: 1000000,
		},
	],

	[Symbol.iterator]: employeeGenerator,
}

function* employeeGenerator() {
	for (const employee of this.employees) {
		yield employee + " is an employee"
	}
}

// for (const iterator of company) {
// 	console.log(iterator)
// }

// for (const employee of company.employees) {
// 	console.log(employee + " is an employee BUT NOT USING GENERATOR")
// }

const course = {
	title: "JavaScript - The Complete Guide",
	rating: 5,
}

Reflect.setPrototypeOf(course, {
	toString() {
		return `REFLECT : ${this.title} - ${this.rating}`
	},
})

Object.setPrototypeOf(course, {
	toString() {
		return `OBJECT : ${this.title} - ${this.rating}`
	},
})

console.log(course.toString())
