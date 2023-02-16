import { DOMHelper } from "../Utils/DOMHelper.js"
import { ProjectItem } from "./ProjectItem.js"

export class ProjectList {
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
