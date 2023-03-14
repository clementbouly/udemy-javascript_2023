import { renderProducts, addNewProductElement } from "./rendering"

let products = [
	{
		id: Math.random().toString(),
		title: "A Book",
		price: 12.99,
	},
	{
		id: Math.random().toString(),
		title: "A Carpet",
		price: 129.99,
	},
	{
		id: Math.random().toString(),
		title: "A Magic Broomstick",
		price: 599.99,
	},
	{
		id: Math.random().toString(),
		title: "A Bottle",
		price: 2.99,
	},
	{
		id: Math.random().toString(),
		title: "A T-Shirt",
		price: 29.99,
	},
]

export function initProducts() {
	renderProducts(products, deleteProduct)
}

export function deleteProduct(prodId) {
	products = products.filter((product) => product.id !== prodId)
	const productToDelete = document.getElementById(prodId)
	productToDelete.remove()
}

export function addProduct(event) {
	event.preventDefault()
	const titleEl = document.querySelector("#new-product #title")
	const priceEl = document.querySelector("#new-product #price")

	const title = titleEl.value
	const price = priceEl.value

	if (title.trim().length === 0 || price.trim().length === 0 || +price < 0) {
		alert("Please enter some valid input values for title and price.")
		return
	}

	const newProduct = {
		id: new Date().toString(),
		title: title,
		price: price,
	}

	products.unshift(newProduct)
	addNewProductElement(newProduct, deleteProduct)
}
