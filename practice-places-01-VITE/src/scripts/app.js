import { getCoordsFromAddress, getAddressFromCoords, displayMap } from "./UI/map.js"
import { displayModalWithContentId, hideModal } from "./UI/modal.js"

const userLocationBtn = document.querySelector("#locate-btn")
const addressForm = document.querySelector("form")
const addressInput = addressForm.querySelector("input")
const shareButton = document.querySelector("#share-btn")
const link = document.querySelector("#share-link")

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
		displayShareableLink(enteredAddress, coords)
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
			const address = await getAddressFromCoords(userCoords)
			updateAddressInput(address)
			displayShareableLink(address, userCoords)
		}
	} catch (error) {
		console.log(error)
		alert("Could not locate you. Please enter an address manually!")
	}
}

const displayShareableLink = (address, coordinates) => {
	link.value = `${location.origin}/my-place/?address=${encodeURI(address)}&lat=${
		coordinates.lat
	}&lng=${coordinates.lng}`
	shareButton.disabled = false
}

const navigateToSharePlace = () => {
	const url = link.value
	// copy url into clipboard

	navigator.clipboard
		.writeText(url)
		.then(() => {
			console.log("Copied to clipboard!")
		})
		.catch((error) => {
			console.log(error)
		})

	window.open(url, "_blank")
}

const updateAddressInput = (address) => {
	addressInput.value = address
}

userLocationBtn.onclick = displayUserLocation
addressForm.onsubmit = handleAddressFormSubmit
shareButton.onclick = navigateToSharePlace
