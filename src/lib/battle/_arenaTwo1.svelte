<script lang="ts">
	// import { generateRandomMap } from './generateRandomMap'
	// import FighterCard from './FighterCard.svelte'
	// import shuffle from '../utils/shuffle'
	let encounterSymbols = $state({
		C: {
			slug: 'C'
		},
		// M: {
		// 	slug: 'M'
		// },
		// N: {
		// 	slug: 'N'
		// },
		// W: {
		// 	slug: 'W'
		// },
		L: {
			slug: 'L'
		},
		'?': {
			slug: '?'
		}
	})
	let options = $state({
		room: {
			w: 28,
			h: 20,
			s: 25,
			wall: '#',
			floor: '_',
			player: '@'
		}
	})
	let grid = $state([])

	function generateRandomMap() {
		let newMap = []

		for (let y = 0; y < options.room.h; y++) {
			// Erstellt 20 Reihen
			let row = ''
			for (let x = 0; x < options.room.w; x++) {
				// Jede Reihe hat 40 Spalten
				if (
					x === 0 ||
					x === options.room.w - 1 ||
					y === 0 ||
					y === options.room.h - 1
				) {
					// Randbereiche mit Wänden (#) markieren
					row += options.room.wall
				} else {
					// Freie Flächen (_) einfügen
					row += options.room.floor
				}
			}
			newMap.push(row) // Die Reihe zur Karte hinzufügen
		}

		// Räume generieren und platzieren
		let rooms = generateRooms()
		rooms.forEach((room) => {
			for (let y = room.y; y < room.y + room.height; y++) {
				for (let x = room.x; x < room.x + room.width; x++) {
					if (
						y === room.y ||
						y === room.y + room.height - 1 ||
						x === room.x ||
						x === room.x + room.width - 1
					) {
						newMap[y] =
							newMap[y].substring(0, x) +
							options.room.wall +
							newMap[y].substring(x + 1)
					}
				}
			}
			// Tür hinzufügen
			let doorX = room.x + Math.floor(room.width / 2)
			let doorY = room.y + room.height - 1
			newMap[doorY] =
				newMap[doorY].substring(0, doorX) +
				'D' +
				newMap[doorY].substring(doorX + 1)
		})

		// Begegnungen platzieren
		placeEncounters(newMap, rooms, Object.keys(encounterSymbols))

		// Spieler und Treppe zur Karte hinzufügen
		newMap[2] =
			newMap[2].substring(0, 2) + options.room.player + newMap[2].substring(3)
		newMap[options.room.h - 2] =
			newMap[options.room.h - 2].substring(0, options.room.w - 2) +
			'S' +
			newMap[options.room.h - 2].substring(options.room.w - 1)
		return newMap
	}

	// Räume erstellen
	function generateRooms() {
		let rooms = []
		let numRooms = Math.floor(Math.random() * 3) + 3 // 3-5 Räume

		for (let i = 0; i < numRooms; i++) {
			let width = Math.floor(Math.random() * 5) + 6 // Breite: 6-10
			let height = Math.floor(Math.random() * 3) + 4 // Höhe: 4-6
			let x = Math.floor(Math.random() * (options.room.w - 2 - width)) + 1
			let y = Math.floor(Math.random() * (options.room.h - 2 - height)) + 1

			// Überlappungen vermeiden
			let overlap = rooms.some(
				(room) =>
					x < room.x + room.width &&
					x + width > room.x &&
					y < room.y + room.height &&
					y + height > room.y
			)

			if (!overlap) {
				rooms.push({ x, y, width, height })
			}
		}

		return rooms
	}

	// Begegnungen platzieren
	function placeEncounters(map, rooms, symb) {
		// let encounterSymbols = ['C', 'M', 'N', 'W', 'L', '?']

		rooms.forEach((room) => {
			let encounters = 0
			for (let y = room.y + 1; y < room.y + room.height - 1; y++) {
				for (let x = room.x + 1; x < room.x + room.width - 1; x++) {
					if (encounters >= 2) break
					if (Math.random() < 0.3) {
						let symbol = symb[Math.floor(Math.random() * symb.length)]
						map[y] = map[y].substring(0, x) + symbol + map[y].substring(x + 1)
						encounters++
					}
				}
				if (encounters >= 2) break
			}
		})
	}

	function initMap() {
		grid = generateRandomMap(options.room.w, options.room.h)
	}

	// initMap()

	// let grid = $state(generateRandomMap(options.room.w, options.room.h))

	// const symboles = ['R', 'S', 'T']
	// class Pokemon {
	// 	name = $state('')
	// 	health = $state(80)
	// 	attack = $state(1)
	// 	defense = $state(1)
	// 	file = $state('')
	// 	constructor(name, health, attack, defense, file) {
	// 		this.name = name
	// 		this.health = health
	// 		this.attack = attack
	// 		this.defense = defense
	// 		this.file = file
	// 	}

	// 	attackOpponent(opponent) {
	// 		const damage = Math.max(0, this.attack - opponent.defense)
	// 		opponent.health -= damage
	// 		return damage
	// 	}

	// 	isAlive() {
	// 		return this.health > 0
	// 	}

	// 	getHealth() {
	// 		return this.health
	// 	}

	// 	getName() {
	// 		return this.name
	// 	}
	// }

	// function battle(playerPokemon, enemyPokemon) {
	// 	let round = 1
	// 	while (playerPokemon.isAlive() && enemyPokemon.isAlive()) {
	// 		console.log(`Round ${round}:`)

	// 		const damage1 = playerPokemon.attackOpponent(enemyPokemon)
	// 		console.log(
	// 			`${playerPokemon.getName()} attacks ${enemyPokemon.getName()} for ${damage1} damage!`
	// 		)
	// 		console.log(
	// 			`${enemyPokemon.getName()} has ${enemyPokemon.getHealth()} health left.`
	// 		)

	// 		if (!enemyPokemon.isAlive()) {
	// 			return `${enemyPokemon.getName()} has fainted! ${playerPokemon.getName()} wins!`
	// 		}

	// 		const damage2 = enemyPokemon.attackOpponent(playerPokemon)
	// 		console.log(
	// 			`${enemyPokemon.getName()} attacks ${playerPokemon.getName()} for ${damage2} damage!`
	// 		)
	// 		console.log(
	// 			`${playerPokemon.getName()} has ${playerPokemon.getHealth()} health left.`
	// 		)

	// 		if (!playerPokemon.isAlive()) {
	// 			return `${playerPokemon.getName()} has fainted! ${enemyPokemon.getName()} wins!`
	// 		}

	// 		round++
	// 	}
	// }

	// let abra = new Pokemon('Abra', 80, 15, 5, 'abra.png')
	// let alakazam = new Pokemon('Alakazam', 80, 15, 5, 'alakazam.png')
	// let dusclops = new Pokemon('Dusclops', 80, 15, 5, 'dusclops.png')
	// let frillish = new Pokemon('Frillish', 80, 15, 5, 'frillish.png')
	// let stunky = new Pokemon('Stunky', 80, 15, 5, 'stunky.png')
	// let mew = new Pokemon('Mew', 100, 20, 10, 'mew.png')

	// let enemys = [abra, alakazam, dusclops, frillish, stunky]
	// enemys = shuffle(enemys)

	// class BattleGame {
	// 	width = $state(1)
	// 	height = $state(1)
	// 	grid = $state([])
	// 	player = $state({})
	// 	enemy = $state({})
	// 	events = $state([])
	// 	constructor(width, height) {
	// 		this.width = width
	// 		this.height = height
	// 		this.grid = this.createGrid()
	// 		this.player = {
	// 			x: 0,
	// 			y: 0,
	// 			pokemon: mew
	// 		}
	// 		this.placeEnemy()
	// 		this.placeEvents()
	// 		this.grid[this.player.y][this.player.x] = 'P' // P represents the player
	// 	}

	// 	createGrid() {
	// 		const grid = []
	// 		for (let i = 0; i < this.height; i++) {
	// 			grid[i] = Array(this.width).fill(options.room.floor)
	// 		}
	// 		return grid
	// 	}

	// 	placeEnemy() {
	// 		const enemyX = Math.floor(Math.random() * this.width)
	// 		const enemyY = Math.floor(Math.random() * this.height)

	// 		// Ensure the enemy is not placed at the player's starting position
	// 		if (enemyX === this.player.x && enemyY === 0) {
	// 			return this.placeEnemy()
	// 		}

	// 		if (!enemys.length) {
	// 			console.log('No Enemys')
	// 			return
	// 		}

	// 		const opponent = enemys.shift()

	// 		this.enemy = {
	// 			x: enemyX,
	// 			y: enemyY,
	// 			pokemon: opponent
	// 		}
	// 		this.grid[enemyY][enemyX] = 'E' // E represents the enemy
	// 	}

	// 	placeEvents() {
	// 		const eventCount = Math.floor(Math.random() * 2) + 1 // 1 or 2 events

	// 		for (let i = 0; i < eventCount; i++) {
	// 			const eventX = Math.floor(Math.random() * this.width)
	// 			const eventY = Math.floor(Math.random() * this.height)

	// 			// Ensure the event is not placed at the player's starting position or enemy's position
	// 			if (
	// 				(eventX === 0 && eventY === 0) ||
	// 				(eventX === this.enemy.x && eventY === this.enemy.y)
	// 			) {
	// 				i--
	// 				continue
	// 			}

	// 			const event = {
	// 				name: `Event${i + 1}`,
	// 				title: `Mysterious Event ${i + 1}`,
	// 				info: `You have encountered a mysterious event!`,
	// 				callback: () => console.log(`Event ${i + 1} triggered!`)
	// 			}

	// 			// this.events[slug] = { x: eventX, y: eventY, event }
	// 			this.events.push({ x: eventX, y: eventY, event })
	// 			this.grid[eventY][eventX] = '?' // Mark the event on the grid
	// 		}
	// 	}

	// 	movePlayer(direction) {
	// 		const oldX = this.player.x
	// 		const oldY = this.player.y

	// 		switch (direction) {
	// 			case 'up':
	// 				if (this.player.y > 0) this.player.y--
	// 				break
	// 			case 'down':
	// 				if (this.player.y < this.height - 1) this.player.y++
	// 				break
	// 			case 'left':
	// 				if (this.player.x > 0) this.player.x--
	// 				break
	// 			case 'right':
	// 				if (this.player.x < this.width - 1) this.player.x++
	// 				break
	// 			default:
	// 				return 'Invalid direction!'
	// 		}

	// 		if (this.player.x === this.enemy.x && this.player.y === this.enemy.y) {
	// 			console.log('Encountered an enemy! Starting battle...')
	// 			console.log(battle(this.player.pokemon, this.enemy.pokemon))
	// 			this.resetEnemy()
	// 		}

	// 		this.updateGrid(oldX, oldY)
	// 		return `Moved ${direction}.`
	// 	}

	// 	resetEnemy() {
	// 		if (!this.enemy.pokemon.isAlive()) {
	// 			this.grid[this.enemy.y][this.enemy.x] = options.room.floor
	// 			this.placeEnemy()
	// 		}
	// 	}

	// 	updateGrid(oldX, oldY) {
	// 		this.grid[oldY][oldX] = options.room.floor // Set old position to empty
	// 		this.grid[this.player.y][this.player.x] = 'P' // Update new position
	// 	}

	// 	displayGrid() {
	// 		return this.grid.map((row) => row.join(' ')).join('\n')
	// 	}
	// }

	// let game = new BattleGame(roomW, roomH)
	// let currSym = $state(game.grid[game.player.y][game.player.x])
	// let curr = $derived(currSym !== options.room.floor)
	// function handleKeydown(event) {
	// 	const directionMap = {
	// 		ArrowUp: 'up',
	// 		ArrowDown: 'down',
	// 		ArrowLeft: 'left',
	// 		ArrowRight: 'right'
	// 	}

	// 	const direction = directionMap[event.key]
	// 	if (direction) {
	// 		game.movePlayer(direction)
	// 		// gridDisplay = game.displayGrid()
	// 	}
	// }
</script>

<section class="content">
	<div
		class="flex justify-center"
		style="--rw: {options.room.w}; --rh: {options.room.h}; --rs: {options.room
			.s}px;">
		<div class="room-grid">
			{#each grid as row}
				{#each row as col}
					<span>{col === options.room.floor ? '' : col}</span>
				{/each}
			{/each}
		</div>
	</div>
</section>

<!-- <section class="absolute top-0 left-0">
	<article class="content space-y-4">
		<FighterCard {...game.player}></FighterCard>
		<FighterCard {...game.enemy}></FighterCard>

	</article>
</section> -->

<!-- <svelte:window onkeydown={handleKeydown} /> -->

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
