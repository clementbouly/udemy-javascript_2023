const userId = 54
const storeButton = document.querySelector("#store-btn")
const retrieveButton = document.querySelector("#retrieve-btn")
const clearButton = document.querySelector("#clear-btn")
const user = {
	name: "Max",
	age: 30,
	hobbies: ["Sports", "Cooking"],
}

storeButton.onclick = () => {
	// store user id in local storage
	// localStorage.setItem("userId", userId)
	// localStorage.setItem("user", JSON.stringify(user))

	// cookies
	document.cookie = "userId=54"
	document.cookie = "user=Max"
}

retrieveButton.onclick = () => {
	// retrieve user id from local storage
	// const extractedId = localStorage.getItem("userId")
	// const extractedUser = JSON.parse(localStorage.getItem("user"))
	// console.log(JSON.parse(extractedId))
	// console.log(extractedUser)

	// LOG ALL COOKIES
	// const cookies = document.cookie.split(";")
	// const cookiesFormated = cookies.map((cookie) => {
	// 	const [key, value] = cookie.split("=")
	// 	return {
	// 		[key]: value,
	// 	}
	// })
	// console.log(cookiesFormated)
	console.log(document.cookie)
	console.log(getCookie("user"))
	console.log(getCookie("userId"))
	console.log(getCookie("_ga"))
}

clearButton.onclick = () => {
	// clear local storage
	localStorage.clear()

	// clear all cookies
	document.cookie = ""
}

// function to get cookie by name
function getCookie(name) {
	const cookies = document.cookie.split(";")
	for (cookie of cookies) {
		const [key, value] = cookie.split("=")
		if (key.trim() === name) {
			return value
		}
	}
	return "no cookie found"
}
