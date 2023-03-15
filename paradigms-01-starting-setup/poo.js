class UserForm {
	constructor(formId) {
		this.form = document.getElementById(formId)
		this.usernameInput = document.getElementById("username")
		this.passwordInput = document.getElementById("password")
		this.form.addEventListener("submit", this.submit.bind(this))
	}

	submit(e) {
		e.preventDefault()

		this.validate(this.usernameInput.value, this.passwordInput.value)

		if (!this.username || !this.password) {
			return
		}

		this.user = new User(this.username, this.password)
		this.user.print()
		this.user.greet()
	}

	validate(username, password) {
		if (username.trim().length === 0) {
			alert("Invalid username")
			return false
		}
		if (password.trim().length <= 5) {
			alert("Password too short")
			return false
		}

		this.username = username
		this.password = password
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
