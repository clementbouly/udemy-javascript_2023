const validateUserInput = (username, password) => {
	if (username.trim().length === 0) {
		alert("Invalid username")
		return false
	}
	if (password.trim().length <= 5) {
		alert("Password too short")
		return false
	}
	return true
}

const userFactory = (username, password) => {
	return {
		username,
		password,
	}
}

const printUser = (user) => {
	console.log("USER : ", user)
}

const greetUser = (user) => {
	console.log(`Hi there, my name is ${user.username}`)
}

const getUserInput = () => {
	const usernameInput = document.getElementById("username")
	const passwordInput = document.getElementById("password")
	// how to check if an html element is an input element?
	if (usernameInput.tagName !== "INPUT" || passwordInput.tagName !== "INPUT") {
		throw new Error("Invalid input element")
	}
	return [usernameInput.value, passwordInput.value]
}

const handleUser = (e, getUserInput, validator, userFactory, printUser, greetUser) => {
	e.preventDefault()
	const [username, password] = getUserInput()

	if (!validator(username, password)) {
		return
	}

	const user = userFactory(username, password)

	printUser(user)
	greetUser(user)
}

const initForm = (formId, formHandler) => {
	const formElement = document.getElementById(formId)
	formElement.addEventListener("submit", formHandler)
}

initForm("user-input", (e) =>
	handleUser(e, getUserInput, validateUserInput, userFactory, printUser, greetUser)
)
