<script lang="ts">
	import { onMount } from 'svelte'
	import GameContainer from './GameContainer.svelte'
	import { generateRandomMap } from './generateRandomMap'
	import Keylogger from './Keylogger.svelte'
	let currentFloor = $state(1)
	let playerX = $state(2)
	let playerY = $state(2)
	let playerHealth = $state(100)
	let playerInventory = $state({})
	let equippedItems = $state({})
	/* --------------------------------- Actions -------------------------------- */
	let invObj = $derived(formatObjKeys(playerInventory))
	let equiObj = $derived(formatObjKeys(equippedItems))
	let gameContainer = $state()
	let actionButtons = $state([])
	let actionText = $state('Choose your action')
	let mapArray = $state()
	/* --------------------------------- Page El -------------------------------- */
	let started = $state(false)
	let keysLock = $state(false)
	let modalEl = $state()
	let messages = $state([])

	function initializeMap() {
		let maps = {}
		if (!maps[currentFloor]) {
			maps[currentFloor] = generateRandomMap()
		}
		return maps[currentFloor]
	}

	async function generateText(text) {
		console.log(text)
	}

	function renderMap() {
		gameContainer = mapArray.join('\n')
		// invObj = formatObjKeys(playerInventory)
		// equiObj = formatObjKeys(equippedItems)
	}

	function formatObjKeys(obj) {
		return Object.keys(obj).join(', ') || 'None'
	}

	function movePlayer(dx, dy) {
		// if (keysLock) {
		// 	console.log('Dialog Open')
		// 	return
		// }
		let newX = playerX + dx
		let newY = playerY + dy

		if (
			newX >= 0 &&
			newX < mapArray[0].length &&
			newY >= 0 &&
			newY < mapArray.length
		) {
			if (mapArray[newY][newX] !== '#') {
				let row = mapArray[playerY].split('')
				row[playerX] = '_'
				mapArray[playerY] = row.join('')

				row = mapArray[newY].split('')
				let encounterSymbol = row[newX]
				row[newX] = '@'
				mapArray[newY] = row.join('')

				playerX = newX
				playerY = newY

				renderMap()
				handleEncounter(encounterSymbol)
			}
		}
	}
	function unLockKeys() {
		keysLock = false
	}
	function lockKeys() {
		keysLock = true
	}
	async function handleEncounter(symbol) {
		actionText = `You encountered ${symbol === '_' ? '' : symbol}`
		actionButtons = []

		switch (symbol) {
			case 'D':
				lockKeys()
				addActionButton('Open Door', () => {
					actionText = 'You opened the door.'
					clearActionButtons()
				})

				break
			case 'C':
				lockKeys()
				addActionButton('Open Chest', () => {
					generateText(
						'Choose what you find in the chest: Gold, Potion or Armor.'
					).then((loot) => {
						addToInventory(loot, 'A valuable item found in a chest.')
						actionText = `You found ${loot} in the chest!`
						clearActionButtons()
						renderMap()
					})
				})

				break
			case 'M':
				lockKeys()
				addActionButton('Fight Monster', () => {
					let damage = 20
					if (equippedItems['Sword']) damage = 10 // Reduce damage if sword is equipped
					playerHealth -= damage
					if (playerHealth <= 0) {
						gameOver()
					} else {
						actionText = `You fought the monster and lost ${damage} health!`
						clearActionButtons()
						renderMap()
					}
				})
				addActionButton('Run Away', () => {
					actionText = 'You ran away from the monster.'
					clearActionButtons()
				})

				break
			case 'N':
				lockKeys()
				addActionButton('Talk to NPC', () => {
					generateText('What item does the NPC give you?').then((item) => {
						actionText = `The NPC gives you ${item}.`
						addToInventory(item, 'A gift from a friendly NPC.')
						clearActionButtons()
						renderMap()
					})
				})

				break
			case 'W':
				lockKeys()
				addActionButton('Pick up Weapon', () => {
					addToInventory('Sword', 'A sharp blade for combat.')
					actionText = 'You picked up a sword!'
					clearActionButtons()
					renderMap()
				})

				break
			case 'L':
				addActionButton('Collect Loot', () => {
					selectLoot().then((selectedLoot) => {
						addToInventory(
							selectedLoot,
							'Valuable treasure found during your adventure.'
						)
						actionText = 'You collected ' + selectedLoot + '!'
						clearActionButtons()
						renderMap()
					})
				})
				lockKeys()
				break
			case '?':
				addActionButton('Discover...', async () => {
					let encounterDetails = await generateText(
						'Choose an encounter: Monster, NPC, or find Loot.'
					)
					actionText = 'AI generated encounter: ' + encounterDetails
					clearActionButtons()
					renderMap()
				})
				lockKeys()
				break
			case 'S':
				addActionButton('Go to Next Floor', () => {
					currentFloor++
					mapArray = initializeMap()
					playerX = 2
					playerY = 2
					actionText = 'You ascended to floor ' + currentFloor + '.'
					clearActionButtons()
					renderMap()
				})
				lockKeys()
				break
		}
	}

	function addActionButton(text, onClick) {
		actionButtons.push({ text, onClick })
	}

	function clearActionButtons() {
		actionButtons = []
		unLockKeys()
	}

	function gameOver() {
		actionText = 'Game Over! You died.'
		clearActionButtons()
		addActionButton('Restart', () => {
			playerHealth = 100
			playerInventory = {}
			equippedItems = {}
			playerX = 2
			playerY = 2
			currentFloor = 1
			mapArray = initializeMap()
			renderMap()
			actionText = 'Choose your action'
			clearActionButtons()
		})
	}

	function addToInventory(item, description) {
		if (playerInventory[item]) {
			playerInventory[item].count++
		} else {
			playerInventory[item] = {
				count: 1,
				description: description.slice(0, 25), // Limit description to 25 words
				equipped: false
			}
		}
		addActionButton(`Equip ${item}`, () => equipItem(item))
	}

	function equipItem(item) {
		if (playerInventory[item]) {
			if (equippedItems[item]) {
				equippedItems[item] = false
				playerInventory[item].equipped = false
				actionText = `You unequipped ${item}.`
			} else {
				equippedItems[item] = true
				playerInventory[item].equipped = true
				actionText = `You equipped ${item}.`
			}
			renderMap()
		}
	}

	async function selectLoot() {
		return new Promise((resolve) => {
			actionText = 'Choose your loot:'
			clearActionButtons()

			const lootOptions = ['Gold', 'Gem', 'Artifact']
			lootOptions.forEach((loot) => {
				addActionButton(loot, () => {
					resolve(loot)
				})
			})
		})
	}
	function handleKeyPress(keyLog) {
		switch (keyLog) {
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
	function startGame() {
		playerHealth = 100
		playerInventory = {}
		equippedItems = {}
		playerX = 2
		playerY = 2
		currentFloor = 1
		mapArray = initializeMap()
		console.log({ mapArray })
		renderMap()
		actionText = 'Choose your action'
		clearActionButtons()
		started = true
	}
	// Initialisierung der Karte beim Laden der Komponente
	onMount(() => {
		startGame()
	})
	$inspect(equiObj, invObj)
</script>

<div class="rogue-wrapp">
	<header>
		<h1>Roguelike Game Map</h1>
	</header>
	<article>
		<div class="grid grid-cols-4 gap-4">
			<div class="p-2 col-span-3">
				<GameContainer {mapArray} {currentFloor}></GameContainer>
			</div>
			<aside class="ctrl-bar">
				<section class="flex flex-col gap-1 items-center justify-center">
					<button class="btn" onclick={() => movePlayer(0, -1)}>↑</button>
					<div class="flex gap-2">
						<button class="btn" onclick={() => movePlayer(-1, 0)}>←</button>
						<button class="btn" onclick={() => movePlayer(1, 0)}>→</button>
					</div>
					<button class="btn" onclick={() => movePlayer(0, 1)}>↓</button>
				</section>
				{#if actionButtons.length}
					<section class="bg-base-300 bg-opacity-70 text-center p-4">
						<nav class="grid gap-1">
							<span>{actionText}</span>
							{#each actionButtons as { text, onClick }}
								<button class="btn" onclick={onClick}>{text}</button>
							{/each}
						</nav>
					</section>
				{/if}
			</aside>
		</div>
	</article>

	<footer>
		<div class="p-4">
			<div class="flex items-center justify-between">
				<h3>Player Stats</h3>
				<div>
					<div
						class="badge text-xl font-bold {keysLock
							? 'badge-error'
							: 'badge-success'}">
					</div>
				</div>
			</div>

			<div class="playerStats text-lg">
				<p>Health: <span class="healthEl">{playerHealth}</span></p>
				<p>Floor: <span class="floorEl">{currentFloor}</span></p>
				<p>Inventory: <span class="invObj">{invObj}</span></p>
			</div>
			<div>
				<small>{actionText}</small>
				<!-- {#each actionButtons as { text, onClick }}
					<button class="btn" onclick={onClick}>{text}</button>
				{/each} -->
			</div>
		</div>
	</footer>
</div>
<Keylogger {handleKeyPress}></Keylogger>

<style>
	/* Stil für die Darstellung des Kartencontainers */
	#gameContainer {
		font-family: monospace; /* Monospace-Schrift für konsistente Abstände */
		white-space: pre; /* Zeilenumbrüche beibehalten */
		@apply border inline-block;
	}
	.rogue-wrapp {
		display: grid;
		overflow: hidden;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr auto;
		grid-template-areas: 'header' 'article' 'footer';
		gap: var(--spacing-base);
	}

	.rogue-wrapp > header {
		grid-area: header;
	}

	.rogue-wrapp > article {
		grid-area: article;
		position: relative;
	}

	.rogue-wrapp > footer {
		grid-area: footer;
	}
	.ctrl-bar {
		display: grid;
		grid-template: 1 / 1;
		position: relative;
		overflow: hidden;
	}

	.ctrl-bar > * {
		grid-row: 1;
		grid-column: 1;
	}
</style>
