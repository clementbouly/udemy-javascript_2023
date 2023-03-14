import { fetchData } from "./http"

export const loadTitle = () => {
    console.log("loadTitle");
	return fetchData().then((extractedData) => {
		const title = extractedData.title
		const transformedTitle = title.toUpperCase()
		return transformedTitle
	})
}

export const printTitle = () => {
	loadTitle().then((title) => {
		console.log(title)
		return title
		// const h1 = createElement("h1", title, "title")
		// document.body.appendChild(h1)
	})
}

// const button = document.querySelector("#btnFetch")
// button.addEventListener("click", printTitle)
