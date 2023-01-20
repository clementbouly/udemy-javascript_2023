const movieTitleInput = document.querySelector("#title")
const extraNameInput = document.querySelector("#extra-name")
const extraValueInput = document.querySelector("#extra-value")
const addMovieBtn = document.querySelector("#add-movie-btn")

const filterTitleInput = document.querySelector("#filter-title")
const searchBtn = document.querySelector("#search-btn")

const movieList = document.querySelector("#movie-list")

const fakeImageUrl = "https://picsum.photos/500"

const fakeMovieData = [
	{
		id: "m1",
		title: "Harry Potter and the Sorcerer's Stone",
		imageUrl: fakeImageUrl,
		year: 2001,
	},
	{
		id: "m2",
		title: "Harry Potter and the Chamber of Secrets",
		imageUrl: fakeImageUrl,
		year: 2002,
	},
	{
		id: "m3",
		title: "Avengers Infinity War",
		imageUrl: fakeImageUrl,
		year: 2018,
	},
	{
		id: "m4",
		title: "Avengers Endgame",
		imageUrl: fakeImageUrl,
		year: 2019,
	},
]

const movies = []

const renderNewMovieElement = (movie) => {
	const { id, title: movieTitle, imageUrl, ...rest } = movie
	const { getFormatedTitle } = movie
	// get key of rest object
	const [extraName, ...extraNames] = Object.keys(rest)
	// get value of rest object
	const [extraValue, ...extraValues] = Object.values(rest)

	const newMovieElement = document.createElement("li")
	newMovieElement.className = "movie-element"
	newMovieElement.id = id
	newMovieElement.innerHTML = `
	    <div class="movie-element__image">
	        <img src="${imageUrl}" alt="${movieTitle}" />
	    </div>
	    <div class="movie-element__info">
	        <h2>${movieTitle} : ${getFormatedTitle()}</h2>
	        <p>${extraName}: ${extraValue}</p>
	    </div>
	`
	movieList.append(newMovieElement)
}

const renderMovies = (moviesToRender, filter = "") => {
	movieList.innerHTML = ""
	const moviesRendered = moviesToRender
		.filter((movie) => movie.title.toLowerCase().includes(filter.toLowerCase()))
		.map((movie) => {
			renderNewMovieElement(movie)
		})

	displayMovieList(moviesRendered)
}

const displayMovieList = (movies) => {
	if (movies && movies.length === 0) {
		movieList.classList.remove("visible")
	} else {
		movieList.classList.add("visible")
	}
}

const searchMovieHandler = (movies) => {
	const filterTitle = filterTitleInput.value
	renderMovies(movies, filterTitle)
}

const addMovieHandler = () => {
	const imageUrl = fakeImageUrl
	const id = Math.random()
	const title = movieTitleInput.value
	const extraName = extraNameInput.value
	const extraValue = extraValueInput.value

	if (title.trim() === "" || extraName.trim() === "" || extraValue.trim() === "") {
		alert("Please enter valid values (non-empty values).")
		return
	}

	const movie = {
		id,
		title,
		imageUrl,
		[extraName]: extraValue,
		getFormatedTitle() {
			return movie.title.toUpperCase()
		},
	}

	movies.push(movie)
	renderMovies(movies)
	displayMovieList()
}

addMovieBtn.addEventListener("click", addMovieHandler)
searchBtn.addEventListener("click", () => searchMovieHandler(movies))

// add eventListener on enter key press to search
filterTitleInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		searchMovieHandler(movies)
	}
})

renderMovies(movies)
