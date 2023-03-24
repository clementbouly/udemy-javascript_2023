export class Footer extends HTMLElement {
	private shadow: ShadowRoot
	constructor() {
		super()

		this.shadow = this.attachShadow({ mode: "open" })

		const footer = document.createElement("footer")
		const text = document.createElement("p")
		text.textContent = "This is the footer"

		footer.appendChild(text)

		const style = document.createElement("style")
		style.textContent = /*css*/ `
        footer {
          background-color: #333;
          color: #fff;
          text-align: center;
          padding: 1rem;
          margin: 1rem 0;
        }
      `

		this.shadow.appendChild(style)
		this.shadow.appendChild(footer)
	}
}

// declare my footer element
customElements.define("my-footer", Footer)
