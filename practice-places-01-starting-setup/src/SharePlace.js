import { Modal } from "./UI/Modal"
import { Map } from "./UI/Map"
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/location"

class PlaceFinder {
	constructor() {
		const addressForm = document.querySelector("form")
		const locateUserBtn = document.getElementById("locate-btn")
		this.userCoordinates = null
		this.shareLinkInput = document.getElementById("share-link")
		this.shareLinkButton = document.getElementById("share-btn")

		locateUserBtn.onclick = this.locateUserHandler.bind(this)
		addressForm.onsubmit = this.findAddressHandler.bind(this)
		this.shareLinkButton.onclick = this.navigateToSharePlace.bind(this)
	}

	displayMap(coordinates, address) {
		if (!this.map) {
			this.map = new Map(coordinates)
		} else {
			this.map.render(coordinates)
		}

		if (address) {
			this.shareLinkInput.value = `${location.origin}/my-place?address=${encodeURI(
				address
			)}&lat=${coordinates.lat}&lng=${coordinates.lng}`

			this.shareLinkButton.disabled = false
		}
	}

	async navigateToSharePlace() {
		const url = this.shareLinkInput.value
		await navigator.clipboard.writeText(url)
		window.open(url, "_blank")
	}

	locateUserHandler() {
		const modal = new Modal("loading-modal-content")
		modal.show()

		navigator.geolocation.getCurrentPosition(
			async (successResult) => {
				this.userCoordinates = {
					lat: successResult.coords.latitude,
					lng: successResult.coords.longitude,
				}
				modal.hide()

				const address = await getAddressFromCoords(this.userCoordinates)
				this.updateAddressInput(address)

				this.displayMap(this.userCoordinates, address)

				console.log("AFTER UPDATE")
			},
			(error) => {
				alert("Could not locate you unfortunately. Please enter an address manually!")
				modal.hide()
			}
		)
	}

	updateAddressInput(address) {
		const addressInput = document.querySelector("#address-input")
		addressInput.value = address
	}

	async findAddressHandler(e) {
		e.preventDefault()
		const address = e.target.querySelector("input").value

		if (!address || address.trim().length === 0) {
			alert("Invalid address entered - please try again!")
			return
		}

		const modal = new Modal("loading-modal-content")
		modal.show()

		try {
			const coordinates = await getCoordsFromAddress(address)
			this.displayMap(coordinates, address)
		} catch (err) {
			alert(err.message)
		}

		modal.hide()
	}
}

new PlaceFinder()
