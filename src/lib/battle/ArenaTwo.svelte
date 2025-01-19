<script lang="ts">
	// import FighterCard from './FighterCard.svelte'
	import generateRandomMap from './generateRandomMap'
	import Modal from '../modal/Modal.svelte'
	let { title = 'Arena II' } = $props()
	const encounterKeys = ['C', 'M', 'N', 'L', 'S', 'D']
	let options = $state({
		width: 28,
		height: 18,
		size: 25,
		wall: '#',
		floor: '_',
		player: '@',
		exit: 'S'
	})
	let showModal = $state(false)
	let disabledKeys = $state(false)
	let actionButtons = $state([])
	let grid = $state([])

	class Fighter {
		name = $state('')
		x = $state(2)
		y = $state(2)
		health = $state(80)
		attack = $state(1)
		defense = $state(1)
		file = $state('')
		constructor(name, x, y, health, attack, defense, file) {
			this.name = name
			this.x = x
			this.y = y
			this.health = health
			this.attack = attack
			this.defense = defense
			this.file = file
		}
	}
	let player = new Fighter('Mew', 2, 2, 80, 15, 5, 'mew.png')
	let currentFloor = $state(1)
	let actionText = $state('Choose your action')
	/* --------------------------------- Actions -------------------------------- */
	function addActionButton(text, onClick) {
		actionButtons.push({ text, onClick })
	}

	function clearActionButtons() {
		actionButtons = []
	}

	/* --------------------------------- Handler -------------------------------- */

	async function handleEncounter(symbol) {
		actionText = ``
		actionButtons = []

		if (encounterKeys.includes(symbol)) {
			switch (symbol) {
				case 'C':
					actionText = 'You find a Chest'
					addActionButton('Open Chest', () => {
						actionText = ''
						clearActionButtons()
					})

					break
				case 'M':
					actionText = 'You meet an Opponent'
					addActionButton('Fight Monster', () => {
						actionText = ''
						clearActionButtons()
					})

					break
				case 'N':
					actionText = 'You meet an NPC'
					addActionButton('Talk to Npc', () => {
						actionText = ''
						clearActionButtons()
					})

					break
				case 'L':
					actionText = 'You find an Loot'
					addActionButton('Collect Loot', () => {
						actionText = ''
						clearActionButtons()
					})

					break
				case 'S':
					actionText = 'You reech the Stairhouse'
					addActionButton('Go to next Floor', () => {
						actionText = ''
						clearActionButtons()
					})

					break
				case 'D':
					actionText = 'You reech a Door'
					addActionButton('Open Door', () => {
						actionText = ''
						clearActionButtons()
					})

					break
				default:
					actionText = ``
					actionButtons = []
					break
			}
		}
	}
	/* ------------------------------- Move Player ------------------------------ */
	function movePlayer(dx, dy) {
		if (disabledKeys) {
			console.log('Disabled Key')
			return
		}
		let newX = player.x + dx
		let newY = player.y + dy

		if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length) {
			if (grid[newY][newX] !== options.wall) {
				let row = grid[player.y].split('')
				row[player.x] = options.floor
				grid[player.y] = row.join('')

				row = grid[newY].split('')
				let encounterSymbol = row[newX]
				row[newX] = options.player
				grid[newY] = row.join('')

				player.x = newX
				player.y = newY
				handleEncounter(encounterSymbol)
			}
		}
	}

	function initMap() {
		grid.length = 0
		grid = []
		player.x = 2
		player.y = 2
		currentFloor = 1
		grid = generateRandomMap(options.width, options.height)
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

<section class="page-layer nwp center">
	<div class="flex flex-col gap-4">
		<header class="py-4 space-y-4 text-center">
			<h3>{title}</h3>
			<h6>{actionText ? actionText : 'No Messages'}</h6>
			<div class="flex justify-center">
				{#each actionButtons as { text, onClick }}
					<button onclick={onClick} class="btn">{text}</button>
				{:else}
					<button onclick={initMap} class="btn btn-neutral">Refresh</button>
				{/each}
			</div>
		</header>
		<div
			class="room-grid relative"
			style="--rw: {options.width}; --rh: {options.height}; --rs: {options.size}px;">
			{#each grid as row, y}
				{#each row as col, x}
					{#if col === '_'}
						<span> </span>
						<span class="sr-only">{col}</span>
					{:else}
						<span>{col}</span>
					{/if}
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
		<footer class="flex items-center gap-2 py-2">
			<div class="flex items-center gap-2">
				<span>Player:</span>
				<span class="font-bold">{player.name}</span>
			</div>
			<div class="flex items-center gap-2">
				<span>Position:</span>
				<span class="font-bold">{player.x} / {player.y}</span>
			</div>
			<div class="flex items-center gap-2">
				<span>Floor:</span>
				<span class="font-bold">{currentFloor}</span>
			</div>
		</footer>
	</div>
</section>

<svelte:window onkeydown={handleKeydown} />

<Modal bind:showModal>
	{#snippet header()}
		<header class="flex items-center justify-between">
			<span class="text-lg font-bold">Info</span>
			<span></span>
		</header>
	{/snippet}

	<p class="py-4">Click the button below to close</p>
	<div class="modal-action">
		<button class="btn">Action</button>
		<form method="dialog">
			<!-- if there is a button, it will close the modal -->
			<button class="btn">Close</button>
		</form>
	</div>
</Modal>



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
