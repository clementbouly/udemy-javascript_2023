const FAKE_IMAGE_URL = "https://picsum.photos/800"

const FAKE_PRODUCTS = [
	["Apples", FAKE_IMAGE_URL, "Apples are a good source of fiber", 10],
	["Oranges", FAKE_IMAGE_URL, "Oranges are a good source of vitamin C", 15],
	["Bananas", FAKE_IMAGE_URL, "Bananas are a good source of potassium", 20],
	["Grapes", FAKE_IMAGE_URL, "Grapes are a good source of antioxidants", 25],
]

class Component {
	constructor(renderHookId, shouldRender = true) {
		this.renderHookId = renderHookId
		if (shouldRender) {
			this.render()
		}
	}

	render() {}

	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag)
		if (cssClasses) {
			rootElement.className = cssClasses
		}
		if (attributes && attributes.length > 0) {
			attributes.forEach((attr) => rootElement.setAttribute(attr.name, attr.value))
		}
		document.getElementById(this.renderHookId).append(rootElement)
		return rootElement
	}
}

class Product extends Component {
	constructor(title, imageUrl, description, price) {
		super("product-list", false)
		this.title = title
		this.imageUrl = imageUrl
		this.description = description
		this.price = price
		this.render()
	}

	addToCart() {
		App.addProductToCart(this)
	}

	render() {
		const prodEl = this.createRootElement("li", "product-item")
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
	}
}

class Cart extends Component {
	#items = []
	totalEl = null

	get items() {
		return this.#items
	}

	set items(value) {
		this.#items = value
	}

	constructor() {
		super("app", false)
		this.render()
	}

	set cartItems(items) {
		this.items = items
		this.totalEl.textContent = `Total: \$${this.totalAmount}`
	}

	get totalAmount() {
		return this.items.reduce((acc, current) => acc + current.price, 0)
	}

	addProduct(product) {
		const updatedItems = [...this.items, product]
		this.cartItems = updatedItems
	}

	orderProducts() {
		console.log("Ordering...")
		console.log(this.items)
	}

	render() {
		const cartEl = this.createRootElement("section", "cart")
		cartEl.innerHTML = `
                <h2>Total: \$${0}</h2>
                <button>Order Now!</button>
            `
		this.orderButton = cartEl.querySelector("button")
		this.totalEl = cartEl.querySelector("h2")

		this.orderButton.addEventListener("click", () => this.orderProducts())
	}
}

class ProductList extends Component {
	constructor() {
		super("app")
	}

	render() {
		this.createRootElement("ul", "product-list", [{ name: "id", value: "product-list" }])
		FAKE_PRODUCTS.forEach((product) => new Product(...product))
	}
}

class Shop {
	constructor() {
		this.render()
	}

	render() {
		new ProductList()
		this.cart = new Cart()
	}
}

class App {
	static cart
	static init() {
		const shop = new Shop()
		this.cart = shop.cart
	}

	static addProductToCart(product) {
		this.cart.addProduct(product)
	}
}

App.init()
