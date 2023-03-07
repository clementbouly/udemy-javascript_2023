const GOOGLE_MAP_API_KEY = "**************************"

export const getCoordsFromAddress = async (address) => {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
			address
		)}&key=${GOOGLE_MAP_API_KEY}`
	)
	const data = await response.json()
	if (!data || data.status === "ZERO_RESULTS") {
		throw new Error("Could not find location for the specified address.")
	}
	const coords = data.results[0].geometry.location
	return coords
}

export const getAddressFromCoords = async (coords) => {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_MAP_API_KEY}`
	)
	const data = await response.json()
	if (!data || data.status === "ZERO_RESULTS" || !data.results[0]) {
		throw new Error("Could not find address for the specified coordinates.")
	}
	const address = data.results[0].formatted_address
	return address
}

export const displayMap = (coords) => {
	const map = new google.maps.Map(document.getElementById("map"), {
		center: coords,
		zoom: 4,
	})
	new google.maps.Marker({ position: coords, map: map })
}
