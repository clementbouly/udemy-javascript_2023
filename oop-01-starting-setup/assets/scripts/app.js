const FAKE_IMAGE_URL = "https://picsum.photos/800"

class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title
		this.imageUrl = imageUrl
		this.description = description
		this.price = price
	}

	addToCart() {
		App.addProductToCart(this)
	}

	render() {
		const prodEl = document.createElement("li")
		prodEl.className = "product-item"
		prodEl.innerHTML = `
                <div>
                    <img src="${this.imageUrl}" alt="${this.title}">
                    <div class="product-item__content">
                        <h2>${this.title}</h2>
                        <h3>\$${this.price}</h3>
                        <p>${this.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `
		const addToCartButton = prodEl.querySelector("button")
		addToCartButton.addEventListener("click", () => this.addToCart())
		return prodEl
	}
}

class Cart {
	items = []
	totalEl = null

	addProduct(product) {
		this.items.push(product)
		this.totalEl.textContent = `Total: \$${this.getTotal()}`
	}

	getTotal() {
		console.log(this.items)
		return this.items.reduce((acc, current) => acc + current.price, 0)
	}

	render() {
		const cartEl = document.createElement("section")
		cartEl.innerHTML = `
                <h2>Total: \$${0}</h2>
                <button>Order Now!</button>
            `
		cartEl.className = "cart"
		this.totalEl = cartEl.querySelector("h2")
		return cartEl
	}
}

class ProductList {
	products = [
		new Product("Apples", FAKE_IMAGE_URL, "Apples are a good source of fiber", 10),
		new Product("Oranges", FAKE_IMAGE_URL, "Oranges are a good source of vitamin C", 15),
		new Product("Bananas", FAKE_IMAGE_URL, "Bananas are a good source of potassium", 20),
		new Product("Grapes", FAKE_IMAGE_URL, "Grapes are a good source of antioxidants", 25),
	]

	render() {
		const prodList = document.createElement("ul")
		prodList.className = "product-list"
		this.products.forEach((prod) => {
			const prodEl = prod.render()
			prodList.append(prodEl)
		})

		return prodList
	}
}

class Shop {
	render() {
		const app = document.getElementById("app")
		const productList = new ProductList().render()

		this.cart = new Cart()
		const cartEl = this.cart.render()

		app.append(cartEl)
		app.append(productList)
	}
}

class App {
	static cart
	static init() {
		const shop = new Shop()
		shop.render()
		this.cart = shop.cart
	}

	static addProductToCart(product) {
		this.cart.addProduct(product)
	}
}

App.init()
