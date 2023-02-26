export class Map {
	constructor(coords) {
		this.render(coords)
	}

	render(coordinates) {
		if (typeof google === "undefined" || !google.maps) {
			alert("Could not load maps library - please try again later!")
			return
		}

		const map = new google.maps.Map(document.getElementById("map"), {
			center: coordinates,
			zoom: 4,
		})

		new google.maps.Marker({
			position: coordinates,
			map: map,
		})
	}
}
