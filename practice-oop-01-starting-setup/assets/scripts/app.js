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
	}

	connectMoreInfoButton() {
		this.moreInfoButton = this.htmlEl.querySelector(`button:first-of-type`)
		this.moreInfoButton.addEventListener("click", () => this.showMoreInfoHandler())
		// this.moreInfoButton.onclick = this.showMoreInfoHandler.bind(this)
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
		this.hasActiveTooltip = true
		const tooltip = new Tooltip(this.htmlEl.dataset.extraInfo, this.hideTooltip.bind(this))
		tooltip.show()
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
				new ProjectItem(liProject.id, this.switchProject.bind(this, liProject.id))
			)
		}
	}

	setSwitchHandlerFunction(switchHandlerFunction) {
		this.switchHandler = switchHandlerFunction
	}

	addProject(project) {
		console.log("addProject")
		this.projects.push(project)
		DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
		project.update(this.switchProject.bind(this, project.id), this.type)
	}

	switchProject(projectId) {
		this.switchHandler(this.projects.find((p) => p.id === projectId))
		this.projects.filter((p) => p.id !== projectId)
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
