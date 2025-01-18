<script lang="ts">
	let { x, y, pokemon } = $props()
</script>

<div class="card bg-base-100 w-64 shadow-sm">
	<figure>
		<img class="h-16" src="/img/pkmn/{pokemon.file}" alt="Pokemon" />
	</figure>
	<div class="card-body">
		<div class="card-title">{pokemon.name}</div>
		<div class="card-grid gap-1">
			<div>
				<span>Health: </span>
				<span>{pokemon.health}</span>
			</div>
			<div>
				<span>Power:</span>
				<span>
					{pokemon.attack} / {pokemon.defense}
				</span>
			</div>
			<div>
				<span>Pos:</span>
				<span>{x} / {y}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.card-grid {
		display: grid;
	}
	.card-grid > * {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
