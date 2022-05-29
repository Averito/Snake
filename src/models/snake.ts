import { Application, Graphics, Container } from 'pixi.js'

import { config } from './../config/variables'
import { Coordinates } from '../types/coordinates'
import { Berry } from './berry'
import { Score } from './score'

export class Snake {
	private app: Application = {} as Application
	private tailsContainer: Container = {} as Container
	private tails: Coordinates[] = []
	private score: Score = {} as Score
	private size = config.initialSnakeSize

	public x = config.initialSnakeX
	public y = config.initialSnakeY
	public dx = config.cellSize
	public dy = 0

	constructor(app: Application, score: Score) {
		this.app = app
		this.score = score

		this.tailsContainer = new Container()
		this.app.stage.addChild(this.tailsContainer)

		this.control()
	}

	public update(berry: Berry) {
		this.x += this.dx
		this.y += this.dy

		if (this.x < 0) {
			this.x = config.width - config.cellSize
		} else if (this.x >= config.width) {
			this.x = 0
		}

		if (this.y < 0) {
			this.y = config.height - config.cellSize
		} else if (this.y >= config.height) {
			this.y = 0
		}

		this.tails.unshift({ x: this.x, y: this.y })

		if (this.tails.length > this.size) {
			this.tails.pop()
		}

		if (berry.x === this.tails[0].x && berry.y === this.tails[0].y) {
			berry.spawnRandomBerry()
			this.score.incrementScore()
			this.size += 1
		}

		this.tails.forEach((tail, idx, tails) => {
			for (let i = idx + 1; i < tails.length; i++) {
				if (tail.x === tails[i].x && tail.y === tails[i].y) {
					this.death()
				}
			}
		})
	}

	public draw() {
		this.tails.forEach((tail, idx) => {
			const partOfSnake = new Graphics()

			if (idx === 0) {
				partOfSnake.beginFill(config.snakeHeadColor)
			} else {
				partOfSnake.beginFill(config.snakeTailColor)
			}

			partOfSnake.drawRect(tail.x, tail.y, config.cellSize, config.cellSize)
			partOfSnake.endFill()

			this.tailsContainer.addChildAt(partOfSnake, idx)

			if (this.tailsContainer.children.length > this.size) {
				this.tailsContainer.removeChildren(
					this.size,
					this.tailsContainer.children.length
				)
			}
		})
	}

	private death() {
		this.x = config.initialSnakeX
		this.y = config.initialSnakeY
		this.dx = config.cellSize
		this.dy = 0
		this.tails = []
		this.size = config.initialSnakeSize
		this.score.resetScore()
	}

	private control() {
		document.addEventListener('keydown', event => {
			if (event.code == 'KeyW') {
				if (this.dy > 0) return
				this.up()
			} else if (event.code == 'KeyA') {
				if (this.dx > 0) return
				this.left()
			} else if (event.code == 'KeyS') {
				if (this.dy < 0) return
				this.down()
			} else if (event.code == 'KeyD') {
				if (this.dx < 0) return
				this.right()
			}
		})
	}

	private down() {
		this.dy = config.cellSize
		this.dx = 0
	}
	private up() {
		this.dy = -config.cellSize
		this.dx = 0
	}
	private left() {
		this.dx = -config.cellSize
		this.dy = 0
	}
	private right() {
		this.dx = config.cellSize
		this.dy = 0
	}
}
