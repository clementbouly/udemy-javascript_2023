class Tooltip extends HTMLElement {
	private tooltipText: string | null
	private tooltipContainer: HTMLDivElement | null
	private shadow: ShadowRoot

	constructor() {
		super()
		this.shadow = this.attachShadow({ mode: "open" })
		this.shadow.innerHTML = /*html*/ `
            <slot></slot>
            <span class="tooltip-icon">?</span>
        `

		this.tooltipText = this.getAttribute("text") || `Default tooltip text`
		this.tooltipContainer = null
	}

	connectedCallback() {
		const tooltipIcon = this.shadow.querySelector(".tooltip-icon") as HTMLSpanElement

		tooltipIcon.addEventListener("mouseenter", () => this.showTooltip())
		tooltipIcon.addEventListener("mouseleave", () => this.hideTooltip())

		const tooltipStyle = document.createElement("style")
		tooltipStyle.textContent = /*css*/ `
			:host {
				position: relative;
				display: block;
				margin: 1rem;
				width: max-content;
			}

			.tooltip-icon {
				background-color: var(--color1);
				color: white;
				border-radius: 0.25rem;
				padding: 0.15rem 0.5rem;
				text-align: center;
				font-size: 0.75rem;
				margin-left: 0.5rem;
				cursor: pointer;
			}

			.tooltip-container {
				background-color: var(--color1);
				color: white;
				border-radius: 0.25rem;
				padding: 0.5rem;
				text-align: center;
				font-size: 0.75rem;
				margin-left: 0.5rem;
				cursor: pointer;
				width: max-content;
				position: absolute;
                right: 0;
				transform: translateX(100%);
				z-index: 10;
				box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.26);
			}
		`
		this.shadow.appendChild(tooltipIcon)
		this.shadow.appendChild(tooltipStyle)
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue === newValue) return
		if (name === "text") {
			this.tooltipText = newValue
		}
	}

	static get observedAttributes() {
		return ["text"]
	}

	private showTooltip() {
		this.tooltipContainer = document.createElement("div")
		this.tooltipContainer.textContent = this.tooltipText
		this.tooltipContainer.classList.add("tooltip-container")
		this.shadow.appendChild(this.tooltipContainer)
	}

	private hideTooltip() {
		if (this.tooltipContainer) {
			this.shadow.removeChild(this.tooltipContainer)
		}
	}
}

customElements.define("my-tooltip", Tooltip)
