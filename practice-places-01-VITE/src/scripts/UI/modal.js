export const displayModalWithContentId = (contentId) => {
	const modalTemplate = document.querySelector("#modal-template").content.cloneNode(true)
	const modal = modalTemplate.querySelector(".modal")
	const backdrop = modalTemplate.querySelector(".backdrop")

	const content = document.getElementById(contentId).content.cloneNode(true)

	modal.appendChild(content)

	document.body.insertAdjacentElement("afterbegin", modal)
	document.body.insertAdjacentElement("afterbegin", backdrop)
}

export const hideModal = () => {
	const modal = document.querySelector(".modal")
	const backdrop = document.querySelector(".backdrop")

	modal.remove()
	backdrop.remove()
}