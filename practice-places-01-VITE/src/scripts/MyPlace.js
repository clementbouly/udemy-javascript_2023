import { displayMap } from "./UI/map"

const url = new URL(location.href)
const queryParams = url.searchParams
const address = queryParams.get("address")
const coordinates = {
	lat: +queryParams.get("lat"),
	lng: +queryParams.get("lng"),
}
const headerTitle = document.querySelector("header h1")

if (address && coordinates.lat && coordinates.lng) {
	displayMap(coordinates)
	headerTitle.textContent = address
}
