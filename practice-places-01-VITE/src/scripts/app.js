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
		const response = await postLocation(enteredAddress, coords)
		displayShareableLink(response.locId)
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
			const response = await postLocation(address, userCoords)
			displayShareableLink(response.locId)
		}
	} catch (error) {
		console.log(error)
		alert("Could not locate you. Please enter an address manually!")
	}
}

const displayShareableLink = (locationId) => {
	link.value = `${location.origin}/my-place/?locationId=${locationId}`
	shareButton.disabled = false
}

const postLocation = async (address, coords) => {
	try {
		const response = await fetch("http://localhost:3000/add-location", {
			method: "POST",
			body: JSON.stringify({
				address: address,
				lat: coords.lat,
				lng: coords.lng,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
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
