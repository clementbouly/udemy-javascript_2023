class ModalComponent extends HTMLElement {
	shadow: ShadowRoot
	constructor() {
		super()
		this.shadow = this.attachShadow({ mode: "open" })
		this.shadow.innerHTML = /*html*/ `
            <div class="modal">
                <div class="modal-content">
                    <slot name="title"></slot>
                    <section id="main">
                        <slot></slot>
                    </section>
                    <section id="actions">
                        <button>Okay</button>
                        <button>Cancel</button>
                    </section>
                </div>
            </div>
        `

		const style = document.createElement("style")
		style.textContent = /*css*/ `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.75);
                z-index: -1;
                place-content: center;
                opacity: 0;
                display: grid;
                transition: all 0.3s ease-out;
                
            }

            :host(.open) .modal {
                opacity: 1;
                pointer-events: all;
                z-index: 10;
            }

            ::slotted([slot="title"]) {
                font-size: 1.25rem;
                margin: 0;
                padding: 1.5rem 1rem ;
                border-bottom: 1px solid grey;
            }

            .modal-content {
                background-color: white;
                border-radius: 0.25rem;
                max-width: 30rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.26);
                transform: translateY(-20rem);
                transition: all 0.3s ease-out;
            }

            :host(.open) .modal-content {
                transform: translateY(-15rem);
            }

            #main {
                padding: 2rem 1rem;
            }

            #actions {
                padding: 1rem 0;
                border-top: 1px solid grey;
                display: flex;
                justify-content: flex-end;
            }
            button {
                margin: 0 0.25rem;
                padding: 0.25rem 0.5rem;
                border: 1px solid grey;
                border-radius: 0.25rem;
                background-color: white;
                cursor: pointer;
            }
            `
		this.shadow.appendChild(style)
	}

	connectedCallback() {
		const modalContainer = this.shadow.querySelector(".modal")!
		modalContainer.addEventListener("click", (event) => {
			if (event.target === modalContainer) {
				this.cancel()
			}
		})

		const confirmButton = this.shadow.querySelector("button") as HTMLButtonElement
		const cancelButton = confirmButton.nextElementSibling as HTMLButtonElement

		confirmButton.addEventListener("click", () => this.confirm())
		cancelButton.addEventListener("click", () => this.cancel())
	}

	confirm() {
		this.toggleModal()
		const event = new Event("confirm")
		this.dispatchEvent(event)
	}

	cancel() {
		this.toggleModal()
		const event = new Event("cancel")
		this.dispatchEvent(event)
	}

	toggleModal() {
		this.classList.toggle("open")
	}
}

customElements.define("modal-component", ModalComponent)
