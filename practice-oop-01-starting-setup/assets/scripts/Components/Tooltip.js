export class Tooltip {
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
