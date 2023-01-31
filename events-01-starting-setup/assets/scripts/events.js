const form = document.querySelector("form")
const input = document.querySelector("input")

form.addEventListener("submit", (event) => {
	event.preventDefault()
	console.log("You entered: ", input.value)
})

const ul = document.querySelector("ul")

// ul.addEventListener("click", (event) => {
// 	event.target.closest("li").classList.toggle("highlight")
// 	// triger the form event
// 	input.value = event.target.closest("li").querySelector("p").innerHTML
// 	// form.dispatchEvent(new Event("submit"))
// 	const button = form.querySelector("button")
// 	button.click()
// })

ul.addEventListener("dragstart", (event) => {
	console.log(event.target.closest("li"))
})

ul.addEventListener("dragend", (event) => {
	event.preventDefault()
	console.log(event)
})
