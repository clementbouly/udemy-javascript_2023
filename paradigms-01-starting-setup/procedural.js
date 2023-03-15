const userNameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const formElement = document.getElementById("user-input")

formElement.addEventListener("submit", (e) => {
	e.preventDefault()
	const username = userNameInput.value
	const password = passwordInput.value

	if (username.trim().length === 0) {
		alert("Invalid username")
		return
	}
	if (password.trim().length <= 5) {
		alert("Password too short")
		return
	}

	const user = {
		username,
		password,
	}

	console.log(user)
	console.log("hi there, my name is " + user.username)

	const hiddenPassword = "*".repeat(user.password.length - 2) + user.password.slice(-2)
	const userDiv = document.createElement("div")
	userDiv.classList.add("user")
	userDiv.innerHTML = `
        <h2>Username : ${username}</h2>
        <p>Password : ${hiddenPassword}</p>
    `
	document.body.appendChild(userDiv)
})
