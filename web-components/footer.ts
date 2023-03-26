export class Footer extends HTMLElement {
	private shadow: ShadowRoot
	constructor() {
		super()

		this.shadow = this.attachShadow({ mode: "open" })

		this.shadow.innerHTML = /*html*/ `
		<footer>
			<slot></slot>
		</footer>
		`

		const style = document.createElement("style")
		style.textContent = /*css*/ `
        footer {
          background-color: #333;
          color: #fff;
          text-align: center;
          padding: 1rem;
          margin: 1rem 0;
		  font-weight: bold;
        }
      `

		this.shadow.appendChild(style)
	}
}

// declare my footer element
customElements.define("my-footer", Footer)
