import { config } from './config/variables'

export class GameLoop {
	private draw = (): void => {}
	private update = (): void => {}

	constructor(draw: () => unknown, update: () => unknown) {
		this.draw = draw
		this.update = update

		this.animate()
	}

	private animate() {
		setTimeout(() => {
			requestAnimationFrame(this.animate.bind(this))

			this.update()
			this.draw()
		}, config.gameSpeed)
	}
}
