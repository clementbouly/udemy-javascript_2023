import "./footer"
import "./card"
import "./tooltip"
import "./modal"

const buttonModal = document.querySelector("button")!
const modal: ModalComponent = document.querySelector("modal-component")!

buttonModal.addEventListener("click", () => {
	modal.toggleModal()
})

modal.addEventListener("confirm", () => {
	console.log("confirmed")
})

modal.addEventListener("cancel", () => {
	console.log("cancelled")
})
