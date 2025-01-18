<script lang="ts">
	let { mapArray = [], currentFloor = 1 } = $props()
	let rows = $state(0)
	let cols = $state(0)
	let size = $state(16)
	let width = $derived(cols * size + cols)
	$effect(() => {
		if (mapArray.length) {
			rows = mapArray.length
			cols = mapArray[2].length
		}
	})

	// $inspect(rows,cols, mapArray)
</script>

<div
	class="game-rogue-grid"
	style="--cols: {cols}; --rows: {rows}; --size: 1fr; --grid-width: {width}px;">
	{#each mapArray.map((e) => e.split('')) as row}
		{#each row as col}
			<span>{col === '_' ? ' ' : col}</span>
		{/each}
	{/each}
</div>

<style>
	.game-rogue-grid {
		display: grid;
		width: var(--grid-width);
		grid-template-columns: repeat(var(--cols, 1), var(--size, 1fr));
		grid-template-rows: repeat(var(--rows, 1), var(--size, 1fr));
		gap: 1px;
	}

	.game-rogue-grid > span {
		background-color: lightblue;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.5rem;
		aspect-ratio: 1/1;
	}
</style>
