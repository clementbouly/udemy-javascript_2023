export class Card extends HTMLElement {
	constructor() {
		super()

		const shadow = this.attachShadow({ mode: "open" })

		const card = document.createElement("div")
		card.classList.add("card")

		const content = document.createElement("div")
		content.classList.add("content")

		const button = document.createElement("button")
		button.textContent = "open tooltip"
		button.addEventListener("click", () => {
			this.showTooltip()
		})

		content.appendChild(button)
		card.appendChild(content)

		const tooltip = document.createElement("div")
		tooltip.classList.add("tooltip")
		tooltip.textContent = "This is a tooltip"

		shadow.appendChild(card)
		shadow.appendChild(tooltip)

		const style = document.createElement("style")
		style.textContent = /* css */ `
        .card {
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px;
        }
        
        .content {
          display: flex;
          justify-content: space-between;
        }
  
        .tooltip {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #333;
          color: #fff;
          padding: 10px;
          display: none;
        }
  
        .show {
          display: block;
        }
      `

		shadow.appendChild(style)
	}

	showTooltip() {
		console.log("show tooltip")
	}
}

// declare web component
customElements.define("my-card", Card)
