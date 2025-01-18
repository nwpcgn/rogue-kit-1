<script lang="ts">
	import { slide } from 'svelte/transition'
	import copyToClip from '../utils/copyToClip'
	import createListArr from './createListArr'
	import iconList from './iconList.json'
	let { title = 'Nav Generator' } = $props()
	let textInput = $state(`Start\nBattle\nSettings`)
	let genList = $derived(createListArr(textInput))
	let genNav = $state([])
	let showOutput = $state(false)

	function clear() {
		textInput = ''
		genNav = []
	}
	function generate() {
		genNav = genList
	}
	function copy() {
		const json = JSON.stringify(genNav)
		copyToClip(json)
	}
</script>

<article class="content">
	<h1>{title}</h1>
	<h2>Generator 1</h2>
	<textarea
		bind:value={textInput}
		placeholder="..."
		rows="4"
		class="textarea w-full"
		onfocus={() => {
			showOutput = false
			genNav = []
		}}></textarea>
	{#if showOutput}
		<div transition:slide>
			<h4>Output</h4>
			<textarea class="textarea w-full" rows="8"
				>{JSON.stringify(genNav, null, 2)}</textarea>
		</div>
	{:else}
		<div></div>
	{/if}
	<div class="flex gap-2 py-2">
		<button class="btn" onclick={clear}>Clear</button>
		<button class="btn" onclick={generate}>Generate</button>
		{#if genNav.length}
			<button
				class="btn btn-info join-item"
				onclick={() => (showOutput = !showOutput)}>
				{showOutput ? 'Hide' : 'Show'} Output
			</button>
			<button class="btn btn-warning" onclick={copy}>Copy Output</button>
		{/if}
	</div>

	<div class="py-4 space-y-2">
		{#each genNav as { name, href, icon }, index}
			<div class="join">
				<label class="btn join-item">Name</label>
				<input
					class="input join-item"
					type="text"
					value={name}
					placeholder="Name" />
				<label class="btn join-item">Link</label>
				<input
					class="input join-item"
					type="text"
					value={href}
					placeholder="Href"
					onblur={(e) => {
						genNav[index].href = e.currentTarget.value
					}} />
				<label class="btn join-item">Icon</label>
				<select
					class="select join-item"
					onchange={(e) => {
						genNav[index].icon = e.currentTarget.value
					}}>
					<option value="">Auswahl</option>
					{#each iconList as item, i}
						<option value={item.name} selected={icon === item.name}
							>{item.name}</option>
					{/each}
				</select>
				{#if iconList.map((d) => d.name).includes(icon)}
					<label class="btn join-item">
						<span class="sr-only">{icon}</span>
						{@render iconT(icon)}
					</label>
				{:else}
					<label class="btn join-item">{icon}</label>
				{/if}

				<button
					class="btn btn-neutral join-item"
					onclick={() => (showOutput = !showOutput)}>
					Save
				</button>
			</div>
		{/each}
	</div>
</article>

{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}
