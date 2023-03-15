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

const handleUser = (e) => {
	e.preventDefault()
	const usernameInput = document.getElementById("username")
	const passwordInput = document.getElementById("password")

	if (!validateUserInput(usernameInput.value, passwordInput.value)) {
		return
	}

	const user = userFactory(usernameInput.value, passwordInput.value)

	printUser(user)
	greetUser(user)
}

const initForm = () => {
	const formElement = document.getElementById("user-input")
	formElement.addEventListener("submit", handleUser)
}

initForm()
