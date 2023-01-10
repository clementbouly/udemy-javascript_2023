const addModal = document.querySelector("#add-modal")
const confirmDeleteModal = document.querySelector("#delete-modal")

const openAddMovieModal = document.querySelector("header button")
const cancelModalButton = addModal.querySelector(".btn--passive")
const addMovieButton = addModal.querySelector(".btn--success")
const main = document.querySelector("main")
const movieList = document.querySelector("#movie-list")

let movieSelectedId = null

// MODAL

const toggleModal = (modal) => {
	modal.classList.toggle("visible")
	main.classList.toggle("blur")
}

openAddMovieModal.addEventListener("click", () => toggleModal(addModal))

cancelModalButton.addEventListener("click", () => toggleModal(addModal))

// CONFIRM DELETE MODAL

const cancelDeleteButton = confirmDeleteModal.querySelector(".btn--passive")
const confirmDeleteButton = confirmDeleteModal.querySelector(".btn--danger")

cancelDeleteButton.addEventListener("click", () => toggleModal(confirmDeleteModal))
confirmDeleteButton.addEventListener("click", () => {
	deleteMovie(movieSelectedId)
	toggleModal(confirmDeleteModal)
})

// DELETE MOVIE FUNCTION

const deleteMovie = (id) => {
	const movie = document.getElementById(id)
	if (!movie) return
	movie.remove()
}

// CREATE MOVIE ELEMENT

const createMovieElement = (title, imageUrl, rating) => {
	const id = Math.random().toString(36).substring(2, 9)

	imageUrl = imageUrl || "https://picsum.photos/160/"
	rating = rating || Math.floor(Math.random() * 5)
	title = title || "No Title - " + id

	const movieElement = document.createElement("li")
	movieElement.className = "movie-element"
	movieElement.id = id
	movieElement.innerHTML = `
		<div class="movie-element__image">
			<img src="${imageUrl}" alt="${title}">
		</div>
		<div class="movie-element__info">
			<h2>${title}</h2>
			<p>${rating}/5 stars</p>
		</div>
		<div class="movie-element__actions">
			<button class="btn btn--passive" id="delete-${id}">DELETE</button>
		</div>
	
	`
	const deleteButton = movieElement.querySelector(`#delete-${id}`)

	deleteButton.addEventListener("click", () => {
		toggleModal(confirmDeleteModal)
		movieSelectedId = id
	})

	movieList.appendChild(movieElement)
	toggleModal(addModal)
}

// FORM SUBMISSION

const movieTitleInput = document.querySelector("#title")
const imageUrlInput = document.querySelector("#image-url")
const ratingInput = document.querySelector("#rating")

addMovieButton.addEventListener("click", () => {
	createMovieElement(movieTitleInput.value, imageUrlInput.value, ratingInput.value)
})

// TEST DATA
// createMovieElement("Harry Potter", "https://i.ebayimg.com/images/g/nHQAAOSwQ8hhoMr~/s-l1600.jpg", 5)
// createMovieElement("Harry Potter 2", "https://picsum.photos/160", 4)
// createMovieElement("Harry Potter 3", "https://picsum.photos/160", 3)
// toggleModal(addModal)
