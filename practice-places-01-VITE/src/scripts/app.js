import { getCoordsFromAddress, displayMap } from "./UI/map.js"
import { displayModalWithContentId, hideModal } from "./UI/modal.js"

const userLocationBtn = document.querySelector("#locate-btn")
const addressForm = document.querySelector("form")
const addressInput = addressForm.querySelector("input")

const getUserLocation = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(successResult) => {
				const userCoords = {
					lat: successResult.coords.latitude,
					lng: successResult.coords.longitude,
				}
				resolve(userCoords)
			},
			(errorResult) => {
				console.log(errorResult)
				reject(errorResult)
			}
		)
	})
}

const handleAddressFormSubmit = async (event) => {
	event.preventDefault()
	const enteredAddress = addressInput.value

	displayModalWithContentId("loading-modal-content")

	try {
		const coords = await getCoordsFromAddress(enteredAddress)
		hideModal()
		displayMap(coords)
	} catch (error) {
		console.log(error)
		hideModal()
		alert(error.message)
	}
}

const displayUserLocation = async () => {
	try {
		displayModalWithContentId("loading-modal-content")
		const userCoords = await getUserLocation()
		hideModal()
		if (userCoords) {
			window.initMap = displayMap(userCoords)
		}
	} catch (error) {
		console.log(error)
		alert("Could not locate you. Please enter an address manually!")
	}
}

userLocationBtn.onclick = displayUserLocation
addressForm.onsubmit = handleAddressFormSubmit
