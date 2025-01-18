<script lang="ts">
	// import FighterCard from './FighterCard.svelte'
	// import shuffle from '../utils/shuffle'
	import randNum from '../utils/randNum'
	let { title = 'Arena II' } = $props()

	let options = $state({
		room: {
			w: 28,
			h: 18,
			s: 25,
			wall: '#',
			floor: '_',
			player: '@',
			exit: 'S'
		}
	})

	let actionButtons = $state([])
	let actionText = $state('Choose your action')
	let disabledKeys = $state(false)
	/* --------------------------------- Actions -------------------------------- */
	function addActionButton(text, onClick) {
		actionButtons.push({ text, onClick })
	}

	function clearActionButtons() {
		actionButtons = []
	}

	const encounterKeys = ['C', 'M', 'N', 'L', 'S', 'D']
	let encounterSymbols = $state(['C', 'M', 'N', 'L'])

	let currentSymb = $state()

	let grid = $state([])
	let playerX = $state(2)
	let playerY = $state(2)
	let currentFloor = $state(1)
	/* -------------------------------- Generator ------------------------------- */
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
		placeEncounters(newMap, rooms, encounterSymbols)

		// Spieler und Treppe zur Karte hinzufügen
		newMap[2] =
			newMap[2].substring(0, 2) + options.room.player + newMap[2].substring(3)
		newMap[options.room.h - 2] =
			newMap[options.room.h - 2].substring(0, options.room.w - 2) +
			options.room.exit +
			newMap[options.room.h - 2].substring(options.room.w - 1)
		return newMap
	}
	function generateRooms() {
		let rooms = []
		let numRooms = randNum(2, 3)

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

	/* --------------------------------- Handler -------------------------------- */
	const encounterAct = {
		C: {
			slug: 'C',
			title: 'Open Chest',
			action: () => console.log('Open Chest')
		},
		M: {
			slug: 'M',
			title: 'Fight Monster',
			action: () => console.log('Fight Monster')
		},
		N: {
			slug: 'N',
			title: 'Talk to Npc',
			action: () => console.log('Talk to Npc')
		},
		L: {
			slug: 'L',
			title: 'Collect Loot',
			action: () => console.log('Collect Loot')
		},
		S: {
			slug: 'S',
			title: 'Go to Next Floor',
			action: () => console.log('Go to Next Floor')
		},
		D: {
			slug: 'D',
			title: 'Open Door',
			action: () => console.log('Open Door')
		}
	}

	async function handleEncounter(symbol) {
		actionText = ``
		actionButtons = []

		if (encounterKeys.includes(symbol)) {
			let label = encounterAct[symbol].title || 'Action'
			let fn = encounterAct[symbol].action() || null
			disabledKeys = true
			actionText = label
			addActionButton(label, () => {
				fn
				clearActionButtons()
				disabledKeys = false
			})
		}
	}
	/* ------------------------------- Move Player ------------------------------ */
	function movePlayer(dx, dy) {
		if (disabledKeys) {
			console.log('Disabled Key')
			return
		}
		let newX = playerX + dx
		let newY = playerY + dy

		if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length) {
			if (grid[newY][newX] !== options.room.wall) {
				let row = grid[playerY].split('')
				row[playerX] = options.room.floor
				grid[playerY] = row.join('')

				row = grid[newY].split('')
				let encounterSymbol = row[newX]
				row[newX] = options.room.player
				grid[newY] = row.join('')

				playerX = newX
				playerY = newY
				currentSymb = encounterSymbol
				handleEncounter(encounterSymbol)
			}
		}
	}

	function initMap() {
		playerX = 2
		playerY = 2
		currentFloor = 1
		grid = generateRandomMap(options.room.w, options.room.h)
		actionText = ''
		clearActionButtons()
	}

	function handleKeydown(event) {
		switch (event.key) {
			case 'ArrowUp':
				movePlayer(0, -1)
				break
			case 'ArrowDown':
				movePlayer(0, 1)
				break
			case 'ArrowLeft':
				movePlayer(-1, 0)
				break
			case 'ArrowRight':
				movePlayer(1, 0)
				break
		}
	}
</script>

<section class="page-layer nwp">
	<section class="content">
		<header class="text-center py-4 space-y-4">
			<h3>{title}</h3>
			<div class="flex justify-center">
				{#each actionButtons as { text, onClick }}
					<button onclick={onClick} class="btn">{text}</button>
				{:else}
					<button onclick={initMap} class="btn btn-neutral">Refresh</button>
				{/each}
			</div>
		</header>
		<div class="flex justify-center">
			<div
				class="room-grid relative"
				style="--rw: {options.room.w}; --rh: {options.room.h}; --rs: {options
					.room.s}px;">
				{#each grid as row, y}
					{#each row as col, x}
						<span
							style="--op: {col === options.room.floor ? 0 : 1}; {y ==
								playerY && x == playerX
								? `--bg: var(--color-base-200)`
								: ``}">
							{col === options.room.floor ? '' : col}
						</span>
					{/each}
				{:else}
					<section class="page-layer center nwp">
						<article class="card">
							<div class="flex">
								<button onclick={initMap} class="btn btn-neutral btn-xl"
									>Start</button>
							</div>
						</article>
					</section>
				{/each}
			</div>
		</div>
	</section>
</section>

<!-- <section class="absolute top-0 left-0">
	<article class="content space-y-4">
		<FighterCard {...game.player}></FighterCard>
		<FighterCard {...game.enemy}></FighterCard>

	</article>
</section> -->

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
		background-color: var(--bg, var(--color-base-100));
		opacity: var(--op, 1)
		transition: all 0.5s ease-in;
	}
</style>
