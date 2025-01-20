<script lang="ts">
	import { onMount } from 'svelte'
	let rows = $state(18)
	let cols = $state(30)
	let tileW = $state(32)
	let tileH = $state(32)
	let playerX = $state(1)
	let playerY = $state(1)
	let grid = $state([])
	let tilemap = $state('')
	const generateTilemap = (rows, cols, playerX, playerY) => {
		const gArr = (int = 1) => Array.from({ length: int }, () => '_')
		const paginate = (arr, size) =>
			arr.reduce((acc, val, i) => {
				const idx = Math.floor(i / size)
				acc[idx] = acc[idx] || []
				acc[idx].push(val)
				return acc
			}, [])

		const array = gArr(rows * cols)
		const grid = paginate(array, cols)

		// Spielerposition setzen
		grid[playerY][playerX] = '@'

		// Funktion, um zu prüfen, ob ein Raum überlappt
		const isAreaFree = (grid, startX, startY, roomWidth, roomHeight) => {
			for (let y = startY - 1; y <= startY + roomHeight; y++) {
				for (let x = startX - 1; x <= startX + roomWidth; x++) {
					if (grid[y]?.[x] !== '_') {
						return false // Überlappung gefunden
					}
				}
			}
			return true // Bereich ist frei
		}

		// Funktion, um einen Raum hinzuzufügen
		const addRoomWithBorder = (grid, rows, cols, roomWidth, roomHeight) => {
			let placed = false

			while (!placed) {
				// Zufällige Position für den Raum
				const startX = Math.floor(Math.random() * (cols - roomWidth - 2)) + 1
				const startY = Math.floor(Math.random() * (rows - roomHeight - 2)) + 1

				// Prüfen, ob der Raum platziert werden kann
				if (isAreaFree(grid, startX, startY, roomWidth, roomHeight)) {
					// Raum zeichnen
					for (let y = startY; y < startY + roomHeight; y++) {
						for (let x = startX; x < startX + roomWidth; x++) {
							// Setze Rand auf '#'
							if (
								y === startY ||
								y === startY + roomHeight - 1 ||
								x === startX ||
								x === startX + roomWidth - 1
							) {
								grid[y][x] = '#'
							} else {
								// Innenraum auf '_' setzen
								grid[y][x] = '_'
							}
						}
					}

					// Tür mittig an der unteren Wand
					const doorX = startX + Math.floor(roomWidth / 2)
					grid[startY + roomHeight - 1][doorX] = 'D'

					placed = true // Raum wurde erfolgreich platziert
				}
			}
		}

		// Räume zufällig erstellen
		const roomCount = Math.floor(Math.random() * 2) + 2 // 2-3 Räume
		for (let i = 0; i < roomCount; i++) {
			const roomWidth = Math.floor(Math.random() * 5) + 6 // Breite 6-10
			const roomHeight = Math.floor(Math.random() * 3) + 4 // Höhe 4-6
			addRoomWithBorder(grid, rows, cols, roomWidth, roomHeight)
		}

		return grid
	}
	const movePlayer = (dx, dy) => {
		const newX = playerX + dx
		const newY = playerY + dy

		// Überprüfen, ob der Spieler das Spielfeld verlässt
		if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) {
			console.log('You hit the boundary!')
			return
		}

		const targetTile = grid[newY][newX]

		// Bewegung stoppen, wenn es eine Wand ist
		if (targetTile === '#') {
			console.log('You hit a wall!')
			return
		}

		// Bewegung durchführen
		grid[playerY][playerX] = '_' // Altes Feld leeren
		playerX = newX
		playerY = newY
		grid[playerY][playerX] = '@' // Neue Position setzen

		// Funktion für spezielle Felder aufrufen
		if (targetTile !== '_') {
			handleSpecialTile(targetTile)
		}

		renderTilemap(grid) // Spielfeld neu rendern
	}

	const renderTilemap = (grid) => {
		tilemap = grid.map((row) => row.join(' ')).join('\n')
		console.clear()
		console.log(tilemap)
	}

	const handleSpecialTile = (tile) => {
		console.log(`Player interacted with tile: ${tile}`)
		// Hier kann eine spezifische Logik implementiert werden
		if (tile === 'D') {
			console.log('You found a door!')
		}
	}

	const handleKeydown = (e) => {
		switch (e.key) {
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
			default:
				break
		}
	}

	const initGrid = async () => {
		console.log('initGrid')
		const playerStartX = 1
		const playerStartY = 1
		playerX = playerStartX
		playerY = playerStartY
		grid = generateTilemap(rows, cols, playerX, playerY)
	}
	onMount(() => {
		initGrid()
	})
</script>

<section class="page-layer nwp">
	<article class="content">
		<h1>Start</h1>
	</article>

	<div class="flex justify-center">
		<div class="room-grid" style="--rw: {cols}; --rh: {rows};	--rs: {tileH}px;">
			{#each grid as row, iy}
				{#each row as col, ix}
					<div>
						{#if col === '_'}
							<small class="sr-only">{col}</small>
						{:else}
							<span>{col}</span>
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	</div>
	<details>
		<div style="font-family: monospace; white-space: pre">{tilemap}</div>
	</details>
</section>

<svelte:window onkeydown={handleKeydown} />

<style>
	:root {
		--rw: 10;
		--rh: 10;
		--rs: 32px;
	}

	.room-grid {
		display: grid;
		grid-template-columns: repeat(var(--rw), minmax(0, var(--rs)));
		grid-template-rows: repeat(var(--rh), minmax(0, var(--rs)));
		overflow: hidden;
		gap: var(--rg, 1px);
		background-color: var(--color-base-300);
		border: 1px solid var(--color-base-300);

		> div {
			position: relative;
			background-color: var(--color-base-100);
			overflow: hidden;
			display: grid;
			place-content: center;
			font-weight: 200;
			small {
				font-size: 0.5rem;
				font-weight: 200;
			}
		}
	}
</style>
