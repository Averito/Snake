export class Score {
	private berryCountHTML: HTMLElement | null = null
	public score = 0

	constructor(selector: string) {
		this.berryCountHTML = document.querySelector(selector)
	}

	incrementScore() {
		++this.score
		this.writeInDOM()
	}

	resetScore() {
		this.score = 0
		this.writeInDOM()
	}

	private writeInDOM() {
		if (this.berryCountHTML) {
			this.berryCountHTML.textContent = this.score.toString()
		}
	}
}
