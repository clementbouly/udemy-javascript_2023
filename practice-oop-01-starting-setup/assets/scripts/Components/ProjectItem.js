import { DOMHelper } from "../Utils/DOMHelper.js"
import { Tooltip } from "./Tooltip.js"

export class ProjectItem {
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
		this.moreInfoButton = this.htmlEl.querySelector("button:first-of-type")
		this.moreInfoButton.onclick = () => this.showMoreInfoHandler()
	}

	connectSwitchButton() {
		this.switchButton = this.htmlEl.querySelector("button:last-of-type")
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
