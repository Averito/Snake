import { Berry } from './models/berry'
import { IApplicationOptions, Application, Sprite, Loader } from 'pixi.js'

import gameBG from './assets/icons/gameBG.svg'
import { config } from './config/variables'
import { GameLoop } from './gameLoop'
import { Snake } from './models/snake'
import { Score } from './models/score'

class Game {
	private app: Application = {} as Application
	private snake: Snake = {} as Snake
	private berry: Berry = {} as Berry

	constructor(
		options: IApplicationOptions,
		container: HTMLElement,
		selectorForScore: string
	) {
		const app = new Application(options)
		container.appendChild(app.view)
		this.app = app

		this.setBackground()

		const score = new Score(selectorForScore)
		this.berry = new Berry(this.app)
		this.snake = new Snake(this.app, score)

		new GameLoop(this.draw.bind(this), this.update.bind(this))
	}

	private setBackground() {
		const load: Loader.OnCompleteSignal = (_, textures) => {
			const bgDot = new Sprite(textures.background.texture)
			bgDot.zIndex = 1
			this.app.stage.addChildAt(bgDot, 0)
		}

		this.app.loader.add('background', gameBG).load(load.bind(this))
	}

	private update() {
		this.snake.update(this.berry)
	}

	private draw() {
		this.snake.draw()
	}
}

new Game(
	{
		width: config.width,
		height: config.height,
		backgroundColor: config.backgroundColor,
		antialias: true
	},
	document.querySelector('#game') as HTMLElement,
	'#berryCount'
)
