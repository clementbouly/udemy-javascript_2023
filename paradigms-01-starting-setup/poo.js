class Validator {
	static REQUIRED = "REQUIRED"
	static MIN_LENGTH = "MIN_LENGTH"

	static validate(value, flag, validatorValue) {
		if (flag === this.REQUIRED) {
			return value.trim().length > 0
		}
		if (flag === this.MIN_LENGTH) {
			return value.trim().length > validatorValue
		}
	}
}

class UserForm {
	constructor(formId) {
		this.form = document.getElementById(formId)
		this.usernameInput = document.getElementById("username")
		this.passwordInput = document.getElementById("password")
		this.form.addEventListener("submit", this.submit.bind(this))
	}

	submit(e) {
		e.preventDefault()
		const username = this.usernameInput.value
		const password = this.passwordInput.value

		if (
			!Validator.validate(username, Validator.REQUIRED) ||
			!Validator.validate(password, Validator.MIN_LENGTH, 5)
		) {
			alert("Invalid input, please try again")
			return
		}

		this.user = new User(username, password)
		this.user.print()
		this.user.greet()
	}

	getUser() {
		if (!this.user) {
			throw new Error("No user created yet")
		}
		return this.user
	}
}

class User {
	constructor(name, password) {
		this.name = name
		this.password = password
	}

	print() {
		console.log(this)
	}

	greet() {
		console.log(`Hi there, my name is ${this.name}`)
	}
}

const form = new UserForm("user-input")
