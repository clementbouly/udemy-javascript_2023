class Tooltip {
	constructor(text, closeNotifierFunction) {
		this.closeNotifier = closeNotifierFunction
		this.text = text
	}

	closeTooltip = () => {
		this.delete()
		this.closeNotifier()
	}

	delete() {
		this.tooltipElement.remove()
	}
	show() {
		this.tooltipElement = document.createElement("div")
		this.tooltipElement.className = "card"
		this.tooltipElement.textContent = this.text
		this.tooltipElement.onclick = this.closeTooltip
		document.body.append(this.tooltipElement)
	}
}

class DOMHelper {
	static clearEventListeners(element) {
		const clonedElement = element.cloneNode(true)
		element.replaceWith(clonedElement)
		return clonedElement
	}

	static moveElement(elementId, newDestinationSelector) {
		const element = document.getElementById(elementId)
		const destinationElement = document.querySelector(newDestinationSelector)
		destinationElement.append(element)
		element.scrollIntoView({ behavior: "smooth" })
	}
}

class ProjectItem {
	constructor(id, updateProjectList) {
		this.id = id
		this.updateProjectList = updateProjectList
		this.htmlEl = document.getElementById(id)
		this.hasActiveTooltip = false

		this.connectMoreInfoButton()
		this.connectSwitchButton()
		this.connectDrag()
	}

	connectDrag() {
		this.htmlEl.addEventListener("dragstart", (event) => {
			event.dataTransfer.setData("text/plain", this.id)
			event.dataTransfer.effectAllowed = "move"
		})
	}

	connectMoreInfoButton() {
		this.moreInfoButton = this.htmlEl.querySelector(`button:first-of-type`)
		this.moreInfoButton.onclick = () => this.showMoreInfoHandler()
	}

	connectSwitchButton() {
		this.switchButton = this.htmlEl.querySelector(`button:last-of-type`)
		this.switchButton = DOMHelper.clearEventListeners(this.switchButton)
		this.switchButton.addEventListener("click", this.updateProjectList)
	}

	hideTooltip() {
		this.hasActiveTooltip = false
	}

	showMoreInfoHandler() {
		if (this.hasActiveTooltip) return
		const tooltip = new Tooltip(this.htmlEl.dataset.extraInfo, () => this.hideTooltip())
		tooltip.show()
		this.hasActiveTooltip = true
	}

	update(updateProjectList, type) {
		this.updateProjectList = updateProjectList
		this.connectSwitchButton()
		this.switchButton.textContent = type === "active" ? "Finish" : "Activate"
	}
}

class ProjectList {
	static ACTIVE_TYPE = "active"
	static FINISHED_TYPE = "finished"

	projects = []

	constructor(type) {
		this.type = type
		this.listEl = document.querySelector(`#${this.type}-projects ul`)

		const liProjects = this.listEl.querySelectorAll("li")

		for (const liProject of liProjects) {
			this.projects.push(
				new ProjectItem(liProject.id, () => this.switchProject(liProject.id))
			)
		}
		this.connectDroppeable()
	}

	connectDroppeable() {
		const listEl = this.listEl
		listEl.addEventListener("dragenter", (event) => {
			if (event.dataTransfer.types[0] === "text/plain") {
				event.preventDefault()
				listEl.parentElement.classList.add("droppable")
			}
		})

		listEl.addEventListener("dragover", (event) => {
			if (event.dataTransfer.types[0] === "text/plain") {
				event.preventDefault()
			}
		})

		listEl.addEventListener("dragleave", (event) => {
			if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== listEl) {
				listEl.parentElement.classList.remove("droppable")
			}
		})

		listEl.addEventListener("drop", (event) => {
			const projectId = event.dataTransfer.getData("text/plain")
			if (this.projects.find((p) => p.id === projectId)) return
			document.getElementById(projectId).querySelector("button:last-of-type").click()
			listEl.parentElement.classList.remove("droppable")
			event.preventDefault()
		})
	}

	setSwitchHandlerFunction(switchHandlerFunction) {
		this.switchHandler = switchHandlerFunction
	}

	addProject(project) {
		this.projects.push(project)
		DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
		project.update(() => this.switchProject(project.id), this.type)
	}

	switchProject(projectId) {
		this.switchHandler(this.projects.find((p) => p.id === projectId))
		this.projects = this.projects.filter((p) => p.id !== projectId)
	}
}

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

gitButton.addEventListener("click", test)

// gitButton.addEventListener("click", getFakeDate)
