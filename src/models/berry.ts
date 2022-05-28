import { Application, Container, Graphics } from 'pixi.js'

import { Coordinates } from './../types/coordinates'
import { config } from '../config/variables'

export class Berry {
	private app: Application = {} as Application
	private berryContainer: Container = {} as Container

	public x = 0
	public y = 0

	constructor(app: Application) {
		this.app = app
		this.berryContainer = new Container()

		this.app.stage.addChild(this.berryContainer)

		this.spawnRandomBerry()
	}

	public spawnRandomBerry() {
		this.berryContainer.removeChildren()

		const randomPosition = this.getRandomPosition()
		const { x, y } = randomPosition

		this.x = x
		this.y = y

		const berry = new Graphics()
		berry.beginFill(config.berryColor)
		// Добавляем по 8 т.к. нужно компенсировать "паддинги" клетки
		berry.drawCircle(x + 8, y + 8, config.berryRadius)
		berry.endFill()

		this.berryContainer.addChild(berry)
	}

	private getRandomPosition(): Coordinates {
		const x =
			Math.floor((Math.random() * config.width) / config.cellSize) *
			config.cellSize
		const y =
			Math.floor((Math.random() * config.height) / config.cellSize) *
			config.cellSize
		return { x, y }
	}
}
