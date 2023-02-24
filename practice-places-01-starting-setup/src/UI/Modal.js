export class Modal {
	constructor(contentId) {
		this.contentTemplateEl = document.getElementById(contentId)
		this.modalTemplateEl = document.getElementById("modal-template")
	}

	show() {
		const modalElements = this.modalTemplateEl.content.cloneNode(true)
		this.modalElement = modalElements.querySelector(".modal")
		this.backdropElement = modalElements.querySelector(".backdrop")

		const contentElement = this.contentTemplateEl.content.cloneNode(true)

		this.modalElement.appendChild(contentElement)

		document.body.insertAdjacentElement("afterbegin", this.modalElement)

		document.body.insertAdjacentElement("afterbegin", this.backdropElement)
	}

	hide() {
		if (this.modalElement && this.backdropElement) {
			this.modalElement.remove()
			this.backdropElement.remove()
		}
	}
}
