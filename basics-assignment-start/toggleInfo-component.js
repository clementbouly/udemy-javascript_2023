class ToggleInfoComponent extends HTMLElement {
	isHidden = true
	constructor() {
		super()
		this._shadowRoot = this.attachShadow({ mode: "open" })
		this._shadowRoot.innerHTML = /*html*/ `
            <style>
                #info-box {
				display: none;
			}
            </style>
            <div>
                <button>SHOW</button>
                <p id="info-box">
                <slot></slot>
                </p>
            </div>
        `
		this.infoEl = this._shadowRoot.querySelector("#info-box")
		this.button = this._shadowRoot.querySelector("button")
	}

	connectedCallback() {
		if (this.hasAttribute("hide")) {
			this.isHidden = this.getAttribute("hide") !== "true"
			this.toggleInfo()
		}

		this.button.addEventListener("click", () => this.toggleInfo())
	}

	toggleInfo() {
		this.isHidden = !this.isHidden

		this.infoEl.style.display = this.isHidden ? "none" : "block"
		this.button.textContent = this.isHidden ? "SHOW" : "HIDE"
	}
}

customElements.define("toggle-info", ToggleInfoComponent)
