const GOOGLE_MAP_API_KEY = "AIzaSyA6shePJUpJZh5wZaEfLOsBVxTj6nrIo54"

export const getCoordsFromAddress = async (address) => {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
			address
		)}&key=${GOOGLE_MAP_API_KEY}`
	)
	const data = await response.json()
	console.log(data)
	if (!data || data.status === "ZERO_RESULTS") {
		throw new Error("Could not find location for the specified address.")
	}
	const coordinates = data.results[0].geometry.location
	return coordinates
}

export const displayMap = (coords) => {
	const map = new google.maps.Map(document.getElementById("map"), {
		center: coords,
		zoom: 16,
	})
	new google.maps.Marker({ position: coords, map: map })
}
