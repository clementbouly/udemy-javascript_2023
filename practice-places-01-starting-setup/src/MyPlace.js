import { Map } from "./UI/Map"

class LoadedPlace {
	constructor(coordinates, address) {
		new Map(coordinates)
		const headerTitleEl = document.querySelector("header h1")
		headerTitleEl.textContent = address
		const shareNewPlaceButton = document.querySelector("a")

		shareNewPlaceButton.href = location.origin
	}
}

const url = new URL(location.href)
const queryParams = url.searchParams

const address = queryParams.get("address")

const coordinates = {
	lat: +queryParams.get("lat"),
	lng: +queryParams.get("lng"),
}

new LoadedPlace(coordinates, address)
