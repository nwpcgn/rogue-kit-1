<script lang="ts">
	import sleep from "$lib/utils/sleep";
	export const coins = [0.05, 0.1, 0.2, 0.5, 1, 2]

	export const sodas = [
		{
			name: 'Pepsi',
			amount: 5,
			price: 1,
			code: 'A1'
		},
		{
			name: 'Coke',
			amount: 5,
			price: 1.2,
			code: 'A2'
		},
		{
			name: 'Fanta',
			amount: 5,
			price: 1.1,
			code: 'A3'
		},
		{
			name: 'Sprite',
			amount: 5,
			price: 0.95,
			code: 'A4'
		}
	]

	const sodaMap = $state(sodas)
	let insertCoins = $state([])
	let disabled = $state(false)
	let insertTotal = $derived(insertCoins.reduce((sum, coin) => sum + coin, 0))
	function addCoin(coin) {
		if (coins.includes(coin)) {
			disabled = true
			sleep(600)
				.then(() => {
					insertCoins.push(coin)
				})
				.then(() => {
					console.log(`Münze hinzugefügt: ${(coin / 100).toFixed(2)}€`)
					disabled = false
				})
		} else {
			console.log(`Ungültige Münze: ${(coin / 100).toFixed(2)}€`)
		}
	}

	// Rückgeld berechnen

	function getChangeArray(change) {
		let changeCoins = []
		let remaining = parseFloat(change)
		coins.sort((a, b) => b - a) // Absteigend sortieren

		for (let coin of coins) {
			while (remaining >= coin) {
				changeCoins.push(coin) // Münze hinzufügen
				remaining = (remaining - coin).toFixed(2) // Rest aktualisieren
			}
		}

		console.log({ changeCoins })
		return changeCoins
	}

	// Getränk kaufen
	function buySoda(code) {
		const soda = sodaMap.find((s) => s.code === code)
		if (!soda) {
			console.log('Ungültiger Code!')
			return
		}

		if (soda.amount <= 0) {
			console.log(`${soda.name} ist ausverkauft!`)
			return
		}

		if (insertTotal >= soda.price) {
			const change = insertTotal - soda.price
			soda.amount-- // Getränk ausgeben
			insertCoins = [] // Münzen zurücksetzen
			console.log(`Sie haben ${soda.name} gekauft!`)
			console.log(`Rückgeld: ${formatChange(change)}`)
			return getChangeArray(change)
		} else {
			const fehlend = ((soda.price - total) / 100).toFixed(2)
			console.log(`Nicht genug Geld. Fehlend: ${fehlend}€`)
			return []
		}
	}

	// Hilfsfunktion zur Formatierung von Rückgeld
	function formatChange(change) {
		return getChangeArray(change)
			.map((c) => (c / 100).toFixed(2) + '€')
			.join(', ')
	}
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<section class="grid grid-cols-2 gap-4">
			<div class="rounded-box p-4 text-center font-bold shadow">
				<div class="soda pepsi">Pepsi</div>
				<div class="pepsi-price">.10</div>
				<div class="tag-one">A1</div>
			</div>
			<div class="rounded-box p-4 text-center font-bold shadow">
				<div class="soda coke">Coke</div>
				<div class="coke-price">.50</div>
				<div class="tag-two">A2</div>
			</div>
			<div class="rounded-box p-4 text-center font-bold shadow">
				<div class="soda sprite">Sprite</div>
				<div class="sprite-price">.50</div>
				<div class="tag-three">A3</div>
			</div>
			<div class="rounded-box p-4 text-center font-bold shadow">
				<div class="soda fanta">Fanta</div>
				<div class="fanta-price">.25</div>
				<div class="tag-four">A4</div>
			</div>
		</section>
		<section class="flex justify-between gap-4 p-4">
			<nav class="flex items-center gap-2">
				{#each coins as coin}
					{#if coin < 1}
						<button
							{disabled}
							class="btn btn-circle btn-sm"
							onclick={() => addCoin(coin)}>{coin * 100}</button>
					{:else}
						<button
							{disabled}
							class="btn btn-circle btn-neutral btn-sm"
							onclick={() => addCoin(coin)}
							data-value={coin}>{coin}</button>
					{/if}
				{/each}
			</nav>
			<nav class="flex items-center gap-2">
				{#each sodaMap as { name, amount, price, code }}
					<button
						disabled={insertTotal < price}
						class="selection btn btn-neutral"
						onclick={() => buySoda(code)}>{code}</button>
				{/each}
			</nav>
		</section>
		<section class="grid grid-cols-3 gap-4 p-4">
			<div class="pay-box rounded p-4 shadow" id="pay">
				{parseFloat(insertTotal).toFixed(2)} €
			</div>
			<div id="sodaCount" class="soda-count rounded p-4 shadow">
				{sodaMap.reduce((sum, ob) => sum + ob.amount, 0)} Sodas
			</div>
			<div id="displayBox" class="rounded p-4 shadow">
				{#each sodaMap as { name, amount, price, code }}
					<div class="displayItem">{name} ({amount})</div>
				{/each}
			</div>
		</section>
	</div>
</div>
