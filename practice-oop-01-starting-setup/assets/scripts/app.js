import { ProjectList } from "./Components/ProjectList.js"

class App {
	static init() {
		const activeProjectsList = new ProjectList(ProjectList.ACTIVE_TYPE)
		const finishedProjectsList = new ProjectList(ProjectList.FINISHED_TYPE)

		activeProjectsList.setSwitchHandlerFunction(
			finishedProjectsList.addProject.bind(finishedProjectsList)
		)
		finishedProjectsList.setSwitchHandlerFunction(
			activeProjectsList.addProject.bind(activeProjectsList)
		)
	}
}

App.init()

/********  CSS TRAINING **********/

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const replaceByRandomLetter = (word, initialWord, event, iterations) => {
	const newWord = word
		.split("")
		.map((char, index) => {
			if (index < iterations) return initialWord[index]

			const randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)]
			return randomLetter
		})
		.join("")

	event.target.textContent = newWord
}

const handleHackerEffect = (event) => {
	const word = event.target.textContent
	const initialWord = event.target.dataset.value
	let iterations = 0

	const interval = setInterval(() => {
		replaceByRandomLetter(word, initialWord, event, iterations)
		if (iterations > word.length) clearInterval(interval)
		iterations += 1 / 3
	}, 20)
}

document.querySelector("h1").onmouseover = handleHackerEffect
document.querySelector("h1").onclick = handleHackerEffect

const translations = {
	"You owe me": "tu me dois",
	"My name is": "je m'appelle",
}

const i18n = (strings, ...values) => {
	const stringTranslated = strings.map((string) => {
		if (translations[string.trim()]) {
			return translations[string.trim()]
		}
		return string
	})
	return `${stringTranslated[0]} ${values[0]}`
}

let amount = 10.3
const name = "John"
const french = i18n`You owe me ${amount}`
const english = i18n`My name is ${name}`

const octoSvg = document.querySelector("#octo-svg")
const octoArm = document.querySelector(".octo-arm")

octoSvg.addEventListener("click", () => {
	octoArm.classList.toggle("animate")
})

const getUserPosition = () => {
	navigator.geolocation.getCurrentPosition(
		(position) => console.log(position),
		(error) => console.log(error)
	)

	console.log("Getting position...")
}

const gitButton = document.querySelector("#octo-svg")

const getFakeData = () => {
	fetch("https://jsonplaceholder.typicode.com/posts")
		.then((response) => response.json())
		.then((posts) => {
			const firstTwoPosts = posts.slice(0, 2)
			console.log({ firstTwoPosts })
			firstTwoPosts.forEach((post) => {
				fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
					.then((response) => {
						return response.json()
					})
					.then((comments) => {
						console.log(`Comments for post : ${post.id}`)
						console.log(comments)
					})
			})
		})
		.catch((error) => {
			console.log("ERROR CATCH : ", error)
		})
}

// getFakeData2 with async/await with try/catch
const getFakeData2 = async () => {
	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts")
		const posts = await response.json()
		const firstTwoPosts = posts.slice(0, 2)
		console.log({ firstTwoPosts })

		const promises = firstTwoPosts.map(async (post) => {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
			)
			const comments = await response.json()
			console.log(`Comments for post : ${post.id}`)
			console.log(comments)
		})
		await Promise.all(promises)
	} catch (error) {
		console.log("ERROR CATCH : ", error)
	}
}

const getGeoLocation = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}

const randomErrorGenerator = () => {
	return new Promise((resolve, reject) => {
		const random = Math.random()
		setTimeout(() => {
			if (random > 0.5) {
				reject("Bad luck ! it's an error ...")
			} else {
				resolve({
					message: "Good luck ! it's a result ...",
					status: "SUCCESS",
				})
			}
		}, 2000)
	})
}
// logLocation with then / catch
const logLocation1 = () => {
	getGeoLocation()
		.then((position) => {
			console.log(position)
		})
		.then(() => {
			console.log("Waiting for random error or result...")
			return randomErrorGenerator()
		})
		.then((result) => {
			console.log(`${result.status} : ${result.message} `)
		})
		.catch((error) => {
			console.log("ERROR : ", error)
		})
}

// logLocation async/await
const logLocation2 = async () => {
	try {
		const position = await getGeoLocation()
		console.log(position)
		console.log("Waiting for random error or result...")
		const result = await randomErrorGenerator()
		console.log(`${result.status} : ${result.message} `)
	} catch (error) {
		console.log("ERROR : ", error)
	}
}

const test = async () => {
	await getFakeData2()
	console.log("getFakeData DONE")
}

const displayGithubUser = async () => {
	let urls = [
		"https://api.github.com/users/iliakan",
		"https://api.github.com/users/remy",
		"https://no-such-url",
	]

	let requests = urls.map((url) => fetch(url))

	// use Promise.allSettled
	let results = await Promise.allSettled(requests)

	results.forEach((result, num) => {
		if (result.status == "fulfilled") {
			console.log(`${urls[num]}: ${result.value.status}`)
		}
		if (result.status == "rejected") {
			console.log(`${urls[num]}: ${result.reason}`)
		}
	})
}

const displayGithubUser2 = () => {
	let urls = [
		"https://api.github.com/users/iliakan",
		"https://api.github.com/users/remy",
		"https://no-such-url",
	]

	Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
		// (*)
		results.forEach((result, num) => {
			if (result.status == "fulfilled") {
				console.log(`${urls[num]}: ${result.value.status}`)
			}
			if (result.status == "rejected") {
				console.log(`${urls[num]}: ${result.reason}`)
			}
		})
	})
}

gitButton.addEventListener("click", getFakeData2)
