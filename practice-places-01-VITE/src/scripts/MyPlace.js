import { displayMap } from "./UI/map"

const url = new URL(location.href)
const queryParams = url.searchParams
const locationId = queryParams.get("locationId")
const headerTitle = document.querySelector("header h1")

const getLocationById = async (locationId) => {
	const response = await fetch(`http://localhost:3000/locations/${locationId}`)
	if (response.status === 404) {
		console.log("Location not found")
		return null
	}
	const data = await response.json()
	return data.location
}

const init = async () => {
	const userLocation = await getLocationById(locationId)
	if (userLocation) {
		displayMap(userLocation.coords)
		headerTitle.textContent = userLocation.address
	} else {
		headerTitle.textContent = "Location not found"
	}
}

init()
