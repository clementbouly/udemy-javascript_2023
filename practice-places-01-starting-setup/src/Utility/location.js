export const GOOGLE_MAP_API_KEY = "AIzaSyA6shePJUpJZh5wZaEfLOsBVxTj6nrIo54"

export async function getCoordsFromAddress(address) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
		address
	)}&key=${GOOGLE_MAP_API_KEY}`

	try {
		const response = await fetch(url)

		if (response.status !== 200) {
			throw new Error("Failed to fetch coordinates. Please try again!")
		}
		const data = await response.json()

		if (!data || data.status === "ZERO_RESULTS") {
			throw new Error("Could not find location for the specified address.")
		}

		const coordinates = data.results[0].geometry.location

		return coordinates
	} catch (err) {
		console.log(err)
	}
}

export async function getAddressFromCoords(coords) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_MAP_API_KEY}`

	try {
		const response = await fetch(url)
		const data = await response.json()

		if (!data || data.status === "ZERO_RESULTS") {
			throw new Error("Could not find address for the specified coordinates.")
		}
		return data.results[0].formatted_address
	} catch (err) {
		console.log(err)
	}
}
