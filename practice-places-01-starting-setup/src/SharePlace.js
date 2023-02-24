import { Modal } from "./UI/Modal"
import { Map } from "./UI/Map"

class PlaceFinder {
	constructor() {
		const addressForm = document.querySelector("form")
		const locateUserBtn = document.getElementById("locate-btn")
		this.userCoordinates = null

		locateUserBtn.onclick = this.locateUserHandler.bind(this)
		addressForm.onsubmit = this.findAddressHandler
	}

	displayMapByCoordinates(coordinates) {
		if (!this.map) {
			this.map = new Map(coordinates)
		} else {
			this.map.render(coordinates)
		}
	}

	locateUserHandler() {
		const modal = new Modal("loading-modal-content")
		modal.show()

		navigator.geolocation.getCurrentPosition(
			(successResult) => {
				this.userCoordinates = {
					lat: successResult.coords.latitude,
					lng: successResult.coords.longitude,
				}
				modal.hide()
				this.displayMapByCoordinates(this.userCoordinates)
			},
			(error) => {
				alert("Could not locate you unfortunately. Please enter an address manually!")
				modal.hide()
			}
		)
	}

	findAddressHandler(e) {
		e.preventDefault()
		console.log("Finding address")
	}
}

new PlaceFinder()
