const title = document.querySelector("h1")

// select the button with class btn
const btn = document.querySelector(".btn")
const ul = document.querySelector("ul")

btn.addEventListener("click", () => {
	ul.classList.toggle("hidden")
})

const inputElement = document.querySelector(".input")

const section = document.querySelector("section")
