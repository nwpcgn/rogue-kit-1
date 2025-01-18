<script lang="ts">
	import FighterCard from './FighterCard.svelte'
	import shuffle from '../utils/shuffle'
	let roomW = $state(10)
	let roomH = $state(10)
	const symboles = ['R', 'S', 'T']
	class Pokemon {
		name = $state('')
		health = $state(80)
		attack = $state(1)
		defense = $state(1)
		file = $state('')
		constructor(name, health, attack, defense, file) {
			this.name = name
			this.health = health
			this.attack = attack
			this.defense = defense
			this.file = file
		}

		attackOpponent(opponent) {
			const damage = Math.max(0, this.attack - opponent.defense)
			opponent.health -= damage
			return damage
		}

		isAlive() {
			return this.health > 0
		}

		getHealth() {
			return this.health
		}

		getName() {
			return this.name
		}
	}

	function battle(playerPokemon, enemyPokemon) {
		let round = 1
		while (playerPokemon.isAlive() && enemyPokemon.isAlive()) {
			console.log(`Round ${round}:`)

			const damage1 = playerPokemon.attackOpponent(enemyPokemon)
			console.log(
				`${playerPokemon.getName()} attacks ${enemyPokemon.getName()} for ${damage1} damage!`
			)
			console.log(
				`${enemyPokemon.getName()} has ${enemyPokemon.getHealth()} health left.`
			)

			if (!enemyPokemon.isAlive()) {
				return `${enemyPokemon.getName()} has fainted! ${playerPokemon.getName()} wins!`
			}

			const damage2 = enemyPokemon.attackOpponent(playerPokemon)
			console.log(
				`${enemyPokemon.getName()} attacks ${playerPokemon.getName()} for ${damage2} damage!`
			)
			console.log(
				`${playerPokemon.getName()} has ${playerPokemon.getHealth()} health left.`
			)

			if (!playerPokemon.isAlive()) {
				return `${playerPokemon.getName()} has fainted! ${enemyPokemon.getName()} wins!`
			}

			round++
		}
	}

	let abra = new Pokemon('Abra', 80, 15, 5, 'abra.png')
	let alakazam = new Pokemon('Alakazam', 80, 15, 5, 'alakazam.png')
	let dusclops = new Pokemon('Dusclops', 80, 15, 5, 'dusclops.png')
	let frillish = new Pokemon('Frillish', 80, 15, 5, 'frillish.png')
	let stunky = new Pokemon('Stunky', 80, 15, 5, 'stunky.png')
	let mew = new Pokemon('Mew', 100, 20, 10, 'mew.png')

	let enemys = [abra, alakazam, dusclops, frillish, stunky]
	enemys = shuffle(enemys)

	class BattleGame {
		width = $state(1)
		height = $state(1)
		grid = $state([])
		player = $state({})
		enemy = $state({})
		events = $state([])
		constructor(width, height) {
			this.width = width
			this.height = height
			this.grid = this.createGrid()
			this.player = {
				x: 0,
				y: 0,
				pokemon: mew
			}
			this.placeEnemy()
			this.placeEvents()
			this.grid[this.player.y][this.player.x] = 'P' // P represents the player
		}

		createGrid() {
			const grid = []
			for (let i = 0; i < this.height; i++) {
				grid[i] = Array(this.width).fill('.')
			}
			return grid
		}

		placeEnemy() {
			const enemyX = Math.floor(Math.random() * this.width)
			const enemyY = Math.floor(Math.random() * this.height)

			// Ensure the enemy is not placed at the player's starting position
			if (enemyX === this.player.x && enemyY === 0) {
				return this.placeEnemy()
			}

			if (!enemys.length) {
				console.log('No Enemys')
				return
			}

			const opponent = enemys.shift()

			this.enemy = {
				x: enemyX,
				y: enemyY,
				pokemon: opponent
			}
			this.grid[enemyY][enemyX] = 'E' // E represents the enemy
		}

		placeEvents() {
			const eventCount = Math.floor(Math.random() * 2) + 1 // 1 or 2 events

			for (let i = 0; i < eventCount; i++) {
				const eventX = Math.floor(Math.random() * this.width)
				const eventY = Math.floor(Math.random() * this.height)

				// Ensure the event is not placed at the player's starting position or enemy's position
				if (
					(eventX === 0 && eventY === 0) ||
					(eventX === this.enemy.x && eventY === this.enemy.y)
				) {
					i--
					continue
				}

				const event = {
					name: `Event${i + 1}`,
					title: `Mysterious Event ${i + 1}`,
					info: `You have encountered a mysterious event!`,
					callback: () => console.log(`Event ${i + 1} triggered!`)
				}

				// this.events[slug] = { x: eventX, y: eventY, event }
				this.events.push({ x: eventX, y: eventY, event })
				this.grid[eventY][eventX] = '?' // Mark the event on the grid
			}
		}

		movePlayer(direction) {
			const oldX = this.player.x
			const oldY = this.player.y

			switch (direction) {
				case 'up':
					if (this.player.y > 0) this.player.y--
					break
				case 'down':
					if (this.player.y < this.height - 1) this.player.y++
					break
				case 'left':
					if (this.player.x > 0) this.player.x--
					break
				case 'right':
					if (this.player.x < this.width - 1) this.player.x++
					break
				default:
					return 'Invalid direction!'
			}

			if (this.player.x === this.enemy.x && this.player.y === this.enemy.y) {
				console.log('Encountered an enemy! Starting battle...')
				console.log(battle(this.player.pokemon, this.enemy.pokemon))
				this.resetEnemy()
			}

			this.updateGrid(oldX, oldY)
			return `Moved ${direction}.`
		}

		resetEnemy() {
			if (!this.enemy.pokemon.isAlive()) {
				this.grid[this.enemy.y][this.enemy.x] = '.'
				this.placeEnemy()
			}
		}

		updateGrid(oldX, oldY) {
			this.grid[oldY][oldX] = '.' // Set old position to empty
			this.grid[this.player.y][this.player.x] = 'P' // Update new position
		}

		displayGrid() {
			return this.grid.map((row) => row.join(' ')).join('\n')
		}
	}

	let game = new BattleGame(roomW, roomH)

	function handleKeydown(event) {
		const directionMap = {
			ArrowUp: 'up',
			ArrowDown: 'down',
			ArrowLeft: 'left',
			ArrowRight: 'right'
		}

		const direction = directionMap[event.key]
		if (direction) {
			game.movePlayer(direction)
			// gridDisplay = game.displayGrid()
		}
	}
</script>

<section class="page-layer center nwp">
	<div
		class="flex justify-center"
		style="--rw: {roomW}; --rh: {roomH}; --rs: 40px;">
		<div class="room-grid">
			{#each game.grid as row}
				{#each row as col}
					<span>{col}</span>
				{/each}
			{/each}
		</div>
	</div>
</section>
<section class="absolute top-0 left-0">
	<article class="content space-y-4">
		<FighterCard {...game.player}></FighterCard>
		<FighterCard {...game.enemy}></FighterCard>
	</article>
</section>

<svelte:window onkeydown={handleKeydown} />

<style>
	.room-grid {
		display: grid;
		grid-template-columns: repeat(var(--rw), minmax(0, var(--rs)));
		grid-template-rows: repeat(var(--rh), minmax(0, var(--rs)));
		overflow: hidden;
		gap: 1px;
		background-color: var(--color-base-300);
		border: 1px solid var(--color-base-300);
	}
	.room-grid > * {
		display: grid;
		place-content: center;
		background-color: var(--color-base-100);
	}
</style>
